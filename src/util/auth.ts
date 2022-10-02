import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { InvalidTokenError } from '../constant/error';

/** 암호화 */
export const getEncryptValue = async (value: string): Promise<string> => {
  return bcrypt.hash(value, 12);
};

/** 암호화 비교 */
export const compareEncryptValue = async (value: string, encryptValue: string): Promise<boolean> => {
  return bcrypt.compare(value, encryptValue);
};

/** JWT 토큰 생성 */
export const createJwtToken = (data: { [key: string]: any }, expiresIn: typeof config.accessExpired): string => {
  return jwt.sign(data, config.jwtSecret, { algorithm: 'HS256', expiresIn });
};

/** JWT 토큰 해석 */
export const openJwtToken = (token: string): { [key: string]: any; iat: number; exp: number } => {
  try {
    return <any>jwt.verify(token, config.jwtSecret, { algorithms: ['HS256'], ignoreExpiration: true });
  } catch (err) {
    throw new InvalidTokenError();
  }
};
