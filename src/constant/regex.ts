// # 영문, 숫자 포함 + 8글자 이상
export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;

// # YYYY-MM-DD 날짜 시간 정규 표현식
export const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

// # YYYY-MM-DD HH:mm:ss 날짜 시간 정규 표현식
export const DATETIME_REGEX =
  /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]/;

export enum DateFormat {
  DateOnly = 'YYYY-MM-DD',
  TimeOnly = 'HH:mm:ss',
  DateTime = 'YYYY-MM-DD HH:mm:ss',
}

export const DAY_LIST = ['일', '월', '화', '수', '목', '금', '토'];
