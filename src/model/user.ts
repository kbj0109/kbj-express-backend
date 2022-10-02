import { _Model } from '.';
import { _UserModel } from '../database/schema/user';
import { IUser } from '../types/schema';

export class UserModel extends _Model<IUser> {
  constructor() {
    super(_UserModel);
  }
}
