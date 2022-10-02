import { ClientSession } from 'mongoose';
import { Service } from '.';
import { DuplicatedError } from '../constant/error';
import { UserModel } from '../model/user';
import { IUser } from '../types/schema';
import { getEncryptValue } from '../util/auth';

export class UserService {
  private readonly model = new UserModel();
  private readonly service = new Service(this.model);

  readOne = this.service.readOne;
  confirmOne = this.service.confirmOne;

  createOne = async (
    data: Omit<IUser, '_id'>,
    option?: { transaction?: ClientSession },
  ): ReturnType<Service<IUser>['createOne']> => {
    if (await this.readOne({ username: data.username })) {
      throw new DuplicatedError({ message: '이미 가입된 username 입니다' });
    }

    const password = await getEncryptValue(data.password);

    return this.service.createOne({ ...data, password }, option);
  };
}
