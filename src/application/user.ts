import { UserService } from '../service/user';

export class UserApplication {
  constructor(private readonly userService: UserService) {}
}
