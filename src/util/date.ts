import dayjs from 'dayjs';
import { DateFormat, DAY_LIST } from '../constant/regex';

/** Date를 String 형식으로 변경 */
export const getStringDate = (date: Date = new Date(), dateFormat: DateFormat): string => {
  return dayjs(date).format(dateFormat);
};

/** Date를 특정 시간으로 +/- 혹은 변경 */
export const getChangeDate = (
  date: Date,
  change?: {
    add?: {
      years?: number;
      months?: number;
      days?: number;
      hours?: number;
      minutes?: number;
      seconds?: number;
      milliseconds?: number;
    };
    fix?: {
      years?: number;
      months?: number;
      days?: number;
      hours?: number;
      minutes?: number;
      seconds?: number;
      milliseconds?: number;
    };
  },
): Date => {
  const { add = {} as { [key: string]: number }, fix = {} as { [key: string]: any } } = change || {};

  let newDate = dayjs(date);

  Object.keys(add).forEach((key) => {
    const v = add[key];
    newDate = v ? newDate.add(v, key as dayjs.ManipulateType) : newDate.subtract(-v, key as dayjs.ManipulateType);
  });

  Object.keys(fix).forEach((key) => {
    const k = key === 'days' ? 'dates' : key; // # 고정하려는 것이 날짜라면, key 값 변경
    const v = key === 'months' ? fix[key] - 1 : fix[key]; // # 월은 0~11을 1~12월로 판단

    newDate = newDate.set(k as dayjs.UnitType, v);
  });

  return newDate.toDate();
};

/** 해당 날짜의 요일을 한글로 리턴 */
export const getDayOfDate = (date: Date): string => {
  return DAY_LIST[date.getDay()];
};
