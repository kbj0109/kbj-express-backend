import supertest from 'supertest';
import { Express } from 'express';
import { Genre, ServerEnv } from '../src/constant';
import { config } from '../src/config';
import { Database } from '../src/database';
import { IMovie, IUser } from '../src/types/schema';

/** 테스트를 위한 Request 를 Cookie 사용 여부에 따라서 생성 후 반환 */
export const getRequest = (server: Express, options = { useCookie: false }): supertest.SuperTest<supertest.Test> => {
  const { useCookie = false } = options || {};

  if (useCookie) return supertest.agent(server);

  return supertest(server);
};

/** 테스트 Database를 연결하고 초기화 */
export const setupTestDB = async (): Promise<void> => {
  config.serverEnv = ServerEnv.Test;

  const dbConnection = new Database(
    config.mongoURL,
    `${config.mongoDatabase}-${ServerEnv.Test}`,
    config.mongoUsername,
    config.mongoPassword,
  );

  beforeAll(async () => {
    await dbConnection.connect();
    await dbConnection.resetDatabase();
  });

  afterAll(async () => {
    await dbConnection.resetDatabase();
    await dbConnection.disconnect();
  });
};

/** 테스트용 사용자 정보 */
export const getSampleUserData = (data?: Partial<IUser>): Omit<IUser, '_id' | 'createdAt'> => {
  return {
    name: 'sample name',
    password: 'sample password',
    username: 'sample',
    ...data,
  };
};

/** 테스트용 영화 정보 */
export const getSampleMovieData = (data?: Partial<IMovie>): Omit<IMovie, '_id' | 'createdAt'> => {
  return {
    actors: ['유재석', '류승룡'],
    description: '영화 설명',
    genres: [Genre.Action, Genre.Comedy, Genre.Fantasy],
    title: '해리포터',
    ...data,
  };
};

export const API = {
  UserSignup: '/users',
  UserReadMyself: '/users',
  UserCheckExist: (username: string): string => `/users/${username}`,
  AuthSignIn: '/auth/signin',
  AuthRenew: '/auth/renew',
  MovieCreate: '/movies',
  MovieRead: (movieId: string): string => `/movies/${movieId}`,
  MovieList: '/movies/list',
};
