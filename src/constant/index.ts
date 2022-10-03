/** DB Table 컬렉션 이름 */
export enum DB_Collection {
  User = 'users',
  Movie = 'movies',
  Schedule = 'schedules',
  Ticket = 'tickets',
  Auth = 'auths',
}

export enum ServerEnv {
  Production = 'production',
  Staging = 'staging',
  Development = 'development',
  Test = 'test',
}

export enum AuthType {
  REFRESH_TOKEN = 0, // Access 토큰 갱신용 리프레시 토큰
}

/** 영화 장르 */
export enum Genre {
  Comedy = 'comedy',
  Romance = 'romance',
  Horror = 'horror',
  Fantasy = 'fantasy',
  Action = 'action',
}
export const GenreList = Object.values(Genre).filter((one) => typeof one === 'string');

/** 영화관 */
export enum Theater {
  YongSan = '용산',
  GangNam = '강남',
  SaDang = '사당',
}
export const TheaterList = Object.values(Theater).filter((one) => typeof one === 'string');
