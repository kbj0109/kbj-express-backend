import app from '../src/application';
import { API, getRequest, getSampleUserData, setupTestDB } from '.';
import { userPropList } from '../src/database/schema/user';
import { UserService } from '../src/service/user';
import { createJwtToken } from '../src/util/auth';
import { ExpiredTokenError, InvalidTokenError } from '../src/constant/error';

const request = getRequest(app);
setupTestDB();

const sample = getSampleUserData();
const userService = new UserService();

describe(`User 테스트`, () => {
  describe('가입 관련 시나리오 테스트', () => {
    test('[성공] 회원가입', async () => {
      const res = await request.post(API.UserSignup).send(sample);
      expect(res.statusCode).toBe(200);

      userPropList.forEach((prop) => {
        if (prop === 'password') expect(res.body).not.toHaveProperty(prop);
        else expect(res.body).toHaveProperty(prop);
      });

      const item = await userService.confirmOne({ username: sample.username });
      expect(sample.password).not.toBe(item.password);
    });

    test('[실패] Username 중복', async () => {
      await request
        .post(API.UserSignup)
        .send({ ...sample, username: 'sample-duplicate' })
        .then((res) => {
          expect(res.statusCode).toBe(200);
        });

      const res = await request.post(API.UserSignup).send({ ...sample, username: 'sample-duplicate' });
      expect(res.statusCode).toBe(409);
    });

    test('[실패] 비밀번호 조건 불가', async () => {
      const res = await request.post(API.UserSignup).send({ ...sample, username: 'sample-password', password: '1234' });
      expect(res.statusCode).toBe(400);
    });

    test('[성공] Username 유무 확인', async () => {
      const username = 'sample-exist';

      await request.get(API.UserCheckExist(username)).then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('isExisted');
        expect(res.body.isExisted).toBe(false);
      });

      const res = await request.post(API.UserSignup).send({ ...sample, username });
      expect(res.statusCode).toBe(200);

      await request.get(API.UserCheckExist(username)).then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('isExisted');
        expect(response.body.isExisted).toBe(true);
      });
    });
  });

  describe('자신 정보 확인 테스트', () => {
    const username = 'sample-myself';
    let accessToken = 'Bearer ';

    beforeAll(async () => {
      await request
        .post(API.UserSignup)
        .send({ ...sample, username })
        .then((res) => {
          expect(res.statusCode).toBe(200);
        });

      const res = await request.post(API.AuthSignIn).send({ username, password: sample.password });
      accessToken = accessToken + res.body.accessToken;
    });

    test('[성공] 자신 정보 확인', async () => {
      const res = await request.get(API.UserReadMyself).set({ authorization: accessToken });
      expect(res.statusCode).toBe(200);

      userPropList.forEach((prop) => {
        if (prop === 'password') expect(res.body).not.toHaveProperty(prop);
        else expect(res.body).toHaveProperty(prop);
      });
    });

    test('[실패] Access Token 없음', async () => {
      const res = await request.get(API.UserReadMyself);
      expect(res.statusCode).toBe(403);
    });

    test('[실패] 잘못된 Access Token', async () => {
      const res = await request.get(API.UserReadMyself).set({ authorization: accessToken + 'a' });
      expect(res.statusCode).toBe(401);
      expect(res.body.type).toBe(new InvalidTokenError().type);
    });

    test('[실패] 만료된 Access Token', async () => {
      const accessToken = createJwtToken({ username }, '-1s');
      const res = await request.get(API.UserReadMyself).set({ authorization: `Bearer ${accessToken}` });

      expect(res.statusCode).toBe(401);
      expect(res.body.type).toBe(new ExpiredTokenError().type);
    });
  });
});
