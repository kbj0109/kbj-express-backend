import app from '../src/application';
import { getRequest, getSampleUserData, setupTestDB } from '.';
import { userPropList } from '../src/database/schema/user';

const request = getRequest(app);
setupTestDB();

const sampleData = getSampleUserData();

describe(`User 테스트`, () => {
  describe('가입 관련 시나리오 테스트', () => {
    test('[성공] 회원가입', async () => {
      const response = await request.post('/users').send(sampleData);
      expect(response.statusCode).toBe(200);

      userPropList.forEach((prop) => {
        if (prop === 'password') expect(response.body).not.toHaveProperty(prop);

        expect(response.body).toHaveProperty(prop);
      });
    });

    test('[실패] Username 중복', async () => {
      const res = await request.post('/users').send({ ...sampleData, username: 'sample-duplicate' });
      expect(res.statusCode).toBe(200);

      const response = await request.post('/users').send({ ...sampleData, username: 'sample-duplicate' });
      expect(response.statusCode).toBe(409);
    });

    test('[실패] 비밀번호 조건 불가', async () => {
      const response = await request
        .post('/users')
        .send({ ...sampleData, username: 'sample-password', password: '1234' });

      expect(response.statusCode).toBe(400);
    });

    test('[성공] Username 유무 확인', async () => {
      const username = 'sample-exist';

      await request.get(`/users/${username}`).then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('isExisted');
        expect(response.body).toBe(false);
      });

      const res = await request.post('/users/').send({ ...sampleData, username });
      expect(res.statusCode).toBe(200);

      await request.get(`/users/${username}`).then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('isExisted');
        expect(response.body).toBe(true);
      });
    });
  });
});
