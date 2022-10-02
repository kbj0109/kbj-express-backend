/** DB Table 컬렉션 이름 */
export enum DB_Collection {
  User = 'users',
  Movie = 'movies',
  Schedule = 'schedules',
  Ticket = 'tickets',
}

export enum ServerEnv {
  Production = 'production',
  Staging = 'staging',
  Development = 'development',
  Test = 'test',
}

/** 영화 장르 */
export enum Genre {
  Comedy = 'comedy',
  Romance = 'romance',
  Horror = 'horror',
  Fantasy = 'fantasy',
  Action = 'action',
}

/** 영화관 */
export enum Theater {
  YongSan = 0,
  GangNam = 1,
  SaDang = 2,
}
