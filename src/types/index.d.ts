export {};

declare global {
  namespace Express {
    interface Request {
      user?: {
        username: string;
        tokenCreatedAt: Date; // 해당 토큰 생성 시간
        tokenExpiredAt: Date; // 해당 로그인 정보가 유효한 시간
      };
    }
  }

  /** 최소 Object 내 속성값 하나는 빈값이 아니어야 한다 */
  type NotEmpty<T> = {
    [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>;
  }[keyof T];

  /** 검색 오브젝트 */
  type SearchCondition = {
    include?: { [key: string]: any }; // 포함 검색
    exact?: { [key: string]: any }; // 일치 검색
    exactOneOf?: { [key: string]: any }; // 하나만 일치해도 검색
    sort?: { [key: string]: any }; // 정렬 조건
    range?: { [key: string]: any }; // 범위 검색
    skip?: number;
    limit?: number;
  };

  /** 카운트 검색 오브젝트 */
  type CountSearchCondition = Omit<SearchCondition, 'skip' | 'limit'>;
}
