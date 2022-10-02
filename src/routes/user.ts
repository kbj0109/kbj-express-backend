import { Router } from 'express';
import { UserApplication } from '../application/user';

const router = Router();

export const userRouter = (userApp: UserApplication): Router => {
  // router.post('/', userApp.createOne);

  return router;
};
