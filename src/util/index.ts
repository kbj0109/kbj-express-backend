import bcrypt from 'bcrypt';

/** 암호화 */
export const getEncryptValue = async (value: string): Promise<string> => {
  return bcrypt.hash(value, 12);
};
