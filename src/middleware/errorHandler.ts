/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { config } from '../config';
import { ServerEnv } from '../constant';
import { CustomError, Errors } from '../constant/error';
import logger from '../util/logger';

// 서버에서 가정한 에러 목록
const errorTypeList = Object.keys(Errors);

/** 운영환경이 아닌 예외처리 */
export const otherErrorHandler = (err: CustomError, _req: Request, res: Response, _next: NextFunction): void => {
  const {
    type = Errors.InternalServerError.type,
    status = Errors.InternalServerError.status,
    message = Errors.InternalServerError.message,
    data,
  } = err;

  if (config.nodeEnv !== ServerEnv.Test) {
    logger.warn(err);
  }

  res.status(status).json({
    type,
    message,
    status,
    data,
    stack: err.stack, // * 운영이 아니면 전체 에러 내용을 보여준다
  });
};

/** 운영환경 예외처리 */
export const productionErrorHandler = (err: CustomError, _req: Request, res: Response, _next: NextFunction): void => {
  if (errorTypeList.includes(err.type) === false) {
    logger.error(err);
  }

  const {
    type = Errors.InternalServerError.type,
    status = Errors.InternalServerError.status,
    message = Errors.InternalServerError.message,
    data,
  } = err;

  res.status(status).json({
    type,
    message,
    status,
    data,
    // stack: err.stack, // * 전체 에러 내용은 운영에 보여주지 않는다
  });
};
