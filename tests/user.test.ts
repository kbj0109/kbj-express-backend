import app from '../src/application';
import { API, getRequest, getSampleUserData, setupTestDB } from '.';
import { userPropList } from '../src/database/schema/user';
import { UserService } from '../src/service/user';

const request = getRequest(app);
setupTestDB();

const sample = getSampleUserData();
const userService = new UserService();

describe(`User 테스트`, () => {
  describe('가입 관련 시나리오 테스트', () => {
    test('[성공] 회원가입', async () => {
      const res = await request.post(API.SignUp).send(sample);
      expect(res.statusCode).toBe(200);

      userPropList.forEach((prop) => {
        if (prop === 'password') expect(res.body).not.toHaveProperty(prop);
        expect(res.body).toHaveProperty(prop);
      });

      const item = await userService.confirmOne({ username: sample.username });
      expect(sample.password).not.toBe(item.password);
    });

    test('[실패] Username 중복', async () => {
      await request
        .post(API.SignUp)
        .send({ ...sample, username: 'sample-duplicate' })
        .then((res) => {
          expect(res.statusCode).toBe(200);
        });

      const res = await request.post(API.SignUp).send({ ...sample, username: 'sample-duplicate' });
      expect(res.statusCode).toBe(409);
    });

    test('[실패] 비밀번호 조건 불가', async () => {
      const res = await request.post(API.SignUp).send({ ...sample, username: 'sample-password', password: '1234' });
      expect(res.statusCode).toBe(400);
    });

    test('[성공] Username 유무 확인', async () => {
      const username = 'sample-exist';

      await request.get(API.CheckUserExist(username)).then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('isExisted');
        expect(res.body).toBe(false);
      });

      const res = await request.post(API.SignUp).send({ ...sample, username });
      expect(res.statusCode).toBe(200);

      await request.get(API.CheckUserExist(username)).then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('isExisted');
        expect(response.body).toBe(true);
      });
    });
  });
});
