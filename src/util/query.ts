import flat from 'flat';
import _ from 'lodash';
import { FilterQuery } from 'mongoose';
import { DATETIME_REGEX, DATE_REGEX } from '../constant/regex';
import { getChangeDate } from './date';

/** Mongoose를 위한 Query 변환  */
export const getFilterQuery = <T>(condition: Partial<T>): FilterQuery<T> => {
  // # 중첩 객체를 { 'a.b.c': value, ... } 로 단층 객체로 변환
  const flatten = flat(condition, { safe: true });

  return flatten as FilterQuery<T>;
};

/** Mongoose를 위한 검색 조건 Query 변환  */
export const getSearchQuery = (condition: SearchCondition): any => {
  const { skip, limit } = condition;
  const queryList: any[] = [];

  if (condition.include && _.isEmpty(condition.include) === false) {
    const include = flat(condition.include, { safe: true }) as { [key: string]: any };

    const match: { [key: string]: any } = {};
    Object.keys(include).forEach((prop) => {
      match[prop] = new RegExp(include[prop]);
    });

    queryList.push({ $match: match });
  }

  if (condition.exact && _.isEmpty(condition.exact) === false) {
    const exact = flat(condition.exact, { safe: true }) as { [key: string]: any };

    const match: { [key: string]: any } = {};
    Object.keys(exact).forEach((prop) => {
      if (exact[prop] === null) match[prop] = { $exists: false };
      else match[prop] = exact[prop];
    });

    queryList.push({ $match: match });
  }

  if (condition.exactOneOf && _.isEmpty(condition.exactOneOf) === false) {
    const exactOneOfList: { [key: string]: any }[] = condition.exactOneOf.map((one: any) => flat(one, { safe: true }));

    const orList: any[] = [];

    exactOneOfList.forEach((one) => {
      const obj: { [key: string]: any } = {};
      Object.keys(one).forEach((prop) => {
        if (one[prop] === null) obj[prop] = { $exists: false };
        else obj[prop] = one[prop];
      });

      orList.push(obj);
    });

    queryList.push({ $match: { $or: orList } });
  }

  if (condition.range && _.isEmpty(condition.range) === false) {
    const range = flat(condition.range, { safe: true }) as { [key: string]: any };

    const match: { [key: string]: any } = {};
    Object.keys(range).forEach((prop) => {
      const value = range[prop];
      const property = prop.substring(0, prop.lastIndexOf('.'));
      match[property] = match[property] || {};

      if (prop.endsWith('.gte')) {
        if (typeof value === 'string' && value.match(DATETIME_REGEX)) {
          match[property].$gte = new Date(value);
        } else if (typeof value === 'string' && value.match(DATE_REGEX)) {
          const date = getChangeDate(new Date(value), { fix: { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 } });
          match[property].$gte = date;
        } else {
          match[property].$gte = value;
        }
      }

      if (prop.endsWith('.lte')) {
        if (typeof value === 'string' && value.match(DATETIME_REGEX)) {
          match[property].$lte = new Date(value);
        } else if (typeof value === 'string' && value.match(DATE_REGEX)) {
          const date = getChangeDate(new Date(value), { fix: { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 } });
          match[property].$lte = getChangeDate(date, { add: { days: 1 } }); // 해당 날짜까지 포함해야 하므로 1일 더하기
        } else {
          match[property].$lte = value;
        }
      }
    });

    queryList.push({ $match: match });
  }

  if (condition.sort && _.isEmpty(condition.sort) === false) {
    const sort = flat(condition.sort, { safe: true }) as { [key: string]: any };

    const _$sort: { [key: string]: any } = {};
    Object.keys(sort).forEach((prop) => {
      if (sort[prop] === 'desc') _$sort[prop] = -1;
      if (sort[prop] === 'asc') _$sort[prop] = 1;
    });

    queryList.push({ $sort: _$sort });
  }

  if (skip !== undefined) {
    queryList.push({ $skip: skip });
  }
  if (limit !== undefined) {
    queryList.push({ $limit: limit });
  }

  return queryList;
};
