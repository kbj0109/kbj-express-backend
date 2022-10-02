import supertest from 'supertest';
import { Express } from 'express';

/** 테스트를 위한 Request 를 Cookie 사용 여부에 따라서 생성 후 반환 */
export const getRequest = (server: Express, options = { useCookie: false }): supertest.SuperTest<supertest.Test> => {
  const { useCookie = false } = options || {};

  if (useCookie) return supertest.agent(server);

  return supertest(server);
};
