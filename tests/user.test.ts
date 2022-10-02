import app from '../src/application';
import { getRequest } from '.';

const request = getRequest(app);

describe(`User 사용자 POST /users 회원가입`, () => {
  describe('성공 테스트', () => {
    beforeAll(async () => {
      //
    });

    afterAll(async () => {
      //
    });

    test('[성공] 상태코드 200', async () => {
      const response = await request.get('/users');

      expect(response.statusCode).toBe(200);
    });
  });
});
