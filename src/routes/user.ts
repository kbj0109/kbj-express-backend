import { Router } from 'express';
import { body, param } from 'express-validator';
import { UserApplication } from '../application/user';
import { asyncTransactionWrapper, asyncWrapper } from '../middleware/asyncWrapper';
import { validator } from '../middleware/paramValidator';

const router = Router();

export const userRouter = (userApp: UserApplication): Router => {
  router.post(
    '/',
    validator([
      body('username').isString().trim().notEmpty().toLowerCase(),
      body('password').isString().trim().isLength({ min: 6 }),
      body('name').isString().trim().notEmpty(),
    ]),
    asyncTransactionWrapper(userApp.createOne),
  );

  router.get(
    '/:username',
    validator([param('username').isString().trim().notEmpty()]),
    asyncWrapper(userApp.checkExist),
  );

  return router;
};
