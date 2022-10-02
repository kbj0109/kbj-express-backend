import { Service } from '.';
import { UserModel } from '../model/user';

export class UserService {
  private readonly model = new UserModel();
  private readonly service = new Service(this.model);

  createOne = this.service.createOne;
}
