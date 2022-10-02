import app from '../src/application';
import { API, getRequest, getSampleUserData, setupTestDB } from '.';

const request = getRequest(app);
setupTestDB();

const sample = getSampleUserData();

describe(`Auth 테스트`, () => {
  beforeAll(async () => {
    await request
      .post(API.UserSignup)
      .send(sample)
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });
  });

  describe('로그인 관련 시나리오 테스트', () => {
    test('[성공] 로그인', async () => {
      const res = await request.post(API.AuthSignIn).send({ username: sample.username, password: sample.password });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('accessToken');
      expect(res.body).toHaveProperty('refreshToken');
    });

    test('[실패] 존재하지 않는 회원', async () => {
      const res = await request
        .post(API.AuthSignIn)
        .send({ username: sample.username + 'a', password: sample.password });
      expect(res.statusCode).toBe(404);
    });

    test('[실패] 잘못된 비밀번호', async () => {
      const res = await request.post(API.AuthSignIn).send({ username: sample.username, password: '1234' });
      expect(res.statusCode).toBe(400);
    });
  });

  describe('토큰 갱신 관련 시나리오 테스트', () => {
    test('[성공] 토큰 갱신', async () => {
      const { accessToken, refreshToken } = await request
        .post(API.AuthSignIn)
        .send({ username: sample.username, password: sample.password })
        .then((res) => {
          expect(res.statusCode).toBe(200);
          return res.body;
        });

      const res = await request
        .post(API.AuthRenew)
        .send({ refreshToken })
        .set('Authorization', `Bearer ${accessToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('accessToken');
    });

    test('[실패] 존재하지 않는 회원', async () => {
      const res = await request
        .post(API.AuthSignIn)
        .send({ username: sample.username + 'a', password: sample.password });
      expect(res.statusCode).toBe(404);
    });

    test('[실패] 잘못된 비밀번호', async () => {
      const res = await request.post(API.AuthSignIn).send({ username: sample.username, password: '1234' });
      expect(res.statusCode).toBe(400);
    });
  });
});
