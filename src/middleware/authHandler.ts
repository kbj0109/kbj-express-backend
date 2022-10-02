import { Request, Response, NextFunction } from 'express';
import { ExpiredTokenError, InvalidTokenError, NotAuthenticatedError } from '../constant/error';
import { openJwtToken } from '../util/auth';

const getToken = (authHeader: string | undefined): string | undefined => {
  return authHeader && authHeader.split(' ')[1];
};

/** 로그인 한 사용자만 통과시키는 미들웨어 - 만료 토큰 허용 여부 설정 가능 */
export const onlySignInUser =
  (option?: { allowExpiredToken?: boolean }) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const { allowExpiredToken = false } = option || {};

    try {
      if (!req.user) throw new NotAuthenticatedError();

      if (allowExpiredToken === false && req.user.tokenExpiredAt < new Date()) {
        throw new ExpiredTokenError();
      }

      return next();
    } catch (error: any) {
      return next(error);
    }
  };

/** 해당 요청이 로그인 한 사용자에 의한 것이라면, 사용자 정보를 해석 */
export const setUserIfSignIn = (req: Request, _res: Response, next: NextFunction): void => {
  try {
    const token = getToken(req.headers.authorization);

    if (token) {
      const payload = openJwtToken(token);
      req.user = {
        username: payload.username,
        tokenCreatedAt: new Date(payload.iat * 1000),
        tokenExpiredAt: new Date(payload.exp * 1000),
      };
    }

    return next();
  } catch {
    // * 토큰이 없는건 괜찮지만, 잘못된 토큰을 가지고 있는 것은 불허
    return next(new InvalidTokenError());
  }
};
