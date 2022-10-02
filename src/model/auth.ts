import { _Model } from '.';
import { _AuthCodeModel } from '../database/schema/auth';
import { IAuthCode } from '../types/schema';

export class AuthCodeModel extends _Model<IAuthCode> {
  constructor() {
    super(_AuthCodeModel);
  }
}
