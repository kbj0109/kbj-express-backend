/* eslint-disable max-classes-per-file */
export const Errors = {
  // 요청값 확인
  BadRequest: { type: 'BadRequest', status: 400, message: '잘못된 요청입니다' },
  // NotFound 404 에러
  NotFound: { type: 'NotFound', status: 404, message: '해당 데이터가 없습니다' },
  // 로그인 확인
  NotAuthenticated: { type: 'NotAuthenticated', status: 403, message: '로그인이 필요합니다' },
  // 토큰 만료
  ExpiredToken: { type: 'ExpiredToken', status: 401, message: '만료된 토큰입니다' },
  // 토큰 유효성 확인
  InvalidToken: { type: 'InvalidToken', status: 401, message: '잘못된 토큰입니다' },
  // 권한 확인
  Unauthorized: { type: 'Unauthorized', status: 403, message: '권한이 부족합니다' },
  // 중복 요청 에러
  DuplicatedRequest: { type: 'DuplicatedRequest', status: 409, message: '중복된 요청입니다' },
  // 백엔드 서버 에러
  InternalServerError: { type: 'InternalServerError', status: 500, message: 'Internal Server Error' },
};

export class CustomError extends Error {
  public status: number;

  public type: string;

  public data?: { [key: string]: any };

  constructor(info: { type: string; status: number; message?: string; data?: { [key: string]: any } }) {
    super();

    const {
      type = Errors.InternalServerError.type,
      status = Errors.InternalServerError.status,
      message = Errors.InternalServerError.message,
      data,
    } = info;

    this.type = type;
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

export class BadRequestError extends CustomError {
  constructor(info?: { message?: string; data?: { [key: string]: any } }) {
    const { message, data } = info || {};

    super({ ...Errors.BadRequest, ...(message && { message }), data });
  }
}

export class NotFoundError extends CustomError {
  constructor(info?: { message?: string; data?: { [key: string]: any } }) {
    const { message, data } = info || {};

    super({ ...Errors.NotFound, ...(message && { message }), data });
  }
}

export class NotAuthenticatedError extends CustomError {
  constructor(info?: { message?: string; data?: { [key: string]: any } }) {
    const { message, data } = info || {};

    super({ ...Errors.NotAuthenticated, ...(message && { message }), data });
  }
}

export class ExpiredTokenError extends CustomError {
  constructor(info?: { message?: string; data?: { [key: string]: any } }) {
    const { message, data } = info || {};

    super({ ...Errors.ExpiredToken, ...(message && { message }), data });
  }
}

export class InvalidTokenError extends CustomError {
  constructor(info?: { message?: string; data?: { [key: string]: any } }) {
    const { message, data } = info || {};

    super({ ...Errors.InvalidToken, ...(message && { message }), data });
  }
}

export class UnauthorizedError extends CustomError {
  constructor(info?: { message?: string; data?: { [key: string]: any } }) {
    const { message, data } = info || {};

    super({ ...Errors.Unauthorized, ...(message && { message }), data });
  }
}

export class DuplicatedError extends CustomError {
  constructor(info?: { message?: string; data?: { [key: string]: any } }) {
    const { message, data } = info || {};

    super({ ...Errors.DuplicatedRequest, ...(message && { message }), data });
  }
}

export class InternalServerError extends CustomError {
  constructor(info?: { message?: string; data?: { [key: string]: any } }) {
    const { message, data } = info || {};

    super({ ...Errors.InternalServerError, ...(message && { message }), data });
  }
}
