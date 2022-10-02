import { UserService } from '../service/user';
import { Request, Response } from 'express';
import { Response_T } from '../constant/transactionResponse';
import { ClientSession } from 'mongoose';
import { refineData } from '../util/dataHandler';

export class UserApplication {
  constructor(private readonly userService: UserService) {}

  createOne = async (req: Request, res: Response_T, transaction: ClientSession): Promise<void> => {
    const { username, password, name } = req.body;
    const createdAt = new Date();

    const item = await this.userService.createOne({ username, password, name, createdAt }, { transaction });

    res.json(refineData(item, { remove: ['password'] }));
  };

  checkExist = async (req: Request, res: Response): Promise<void> => {
    const item = await this.userService.readOne({ username: req.params.username });

    res.json({ isExisted: !!item });
  };

  readMyself = async (req: Request, res: Response): Promise<void> => {
    const { username } = req.user!;

    const item = await this.userService.confirmOne({ username });

    res.json(refineData(item, { remove: ['password'] }));
  };
}
