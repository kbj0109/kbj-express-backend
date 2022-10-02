import { UserService } from '../service/user';
import { Request, Response } from 'express';

export class UserApplication {
  constructor(private readonly userService: UserService) {}

  createOne = async (req: Request, res: Response) => {
    console.log(req.body);
    res.json();
  };
}
