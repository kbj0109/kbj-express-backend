const refineData = <T>(
  document: T,
  config?: {
    set?: { [key: string]: any };
    remove?: (keyof T)[];
    includeObjectId?: boolean;
    includeVersion?: boolean;
  },
): { [key: string]: any } => {
  const { set = {}, remove = [], includeObjectId = true, includeVersion = false } = config || {};
  const object = typeof (<any>document).toObject !== 'function' ? document : (<any>document).toObject();

  if (includeObjectId === false) {
    delete object._id;
  }
  if (includeVersion === false) {
    delete object.__v;
  }

  // 그 외 제거 요청된 속성 제거
  remove.forEach((one) => {
    delete object[one];
  });

  // 그 외 추가 요청된 속성 추가
  Object.keys(set).forEach((one) => {
    object[one] = set[one];
  });

  return object;
};

export { refineData };
