import { RequestHandler } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import _ from 'lodash';
import { BadRequestError } from '../constant/error';

/** 유효성 검사 미들웨어 */
export const validator = (validations: ValidationChain[]): RequestHandler => {
  if (validations.length === 0) {
    return (_req, _res, next) => {
      // 마지막에 유효성 검사 결과를 확인
      const errors = validationResult(_req);
      if (!errors.isEmpty()) {
        const errorList = errors.array().map((item) => item.param);
        throw new BadRequestError({ data: _.uniq(errorList) });
      }
      next();
    };
  }

  const head = validations[0];
  const tail = validations.slice(1);

  return (req, res, next) => {
    head(req, res, (err) => {
      if (err) return next(err);
      validator(tail)(req, res, next);
    });
  };
};
