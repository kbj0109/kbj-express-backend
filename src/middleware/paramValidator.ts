import { RequestHandler } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import _ from 'lodash';
import flat from 'flat';
import { BadRequestError } from '../constant/error';
import { Types } from 'mongoose';

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

/** 해당 string 값이, MongoDB의 ObjectId Stirng 값이 맞는지 확인 */
export const isObjectId = (v: string): boolean => Types.ObjectId.isValid(v);

/** 검색 조건 sort에 해당되는지 확인 */
export const isSort = (obj: { [key: string]: any }): boolean => {
  return Object.values(<any>flat(obj)).every((v) => typeof v === 'string' && ['desc', 'asc'].includes(v.toLowerCase()));
};

/** 검색 조건 Range 에 해당되는지 확인 */
export const isRange = (obj: { [key: string]: any }): boolean => {
  return Object.keys(flat(obj)).every((v) => v.endsWith('.gte') || v.endsWith('.lte'));
};
