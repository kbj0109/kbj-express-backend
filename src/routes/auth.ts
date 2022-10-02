import { Router } from 'express';
import { body } from 'express-validator';
import { AuthApplication } from '../application/auth';
import { asyncWrapper } from '../middleware/asyncWrapper';
import { onlySignInUser } from '../middleware/authHandler';
import { validator } from '../middleware/paramValidator';

const router = Router();

export const authRouter = (authApp: AuthApplication): Router => {
  router.post(
    '/signin',
    validator([body('username').isString().trim().notEmpty().toLowerCase(), body('password').isString().trim()]),
    asyncWrapper(authApp.signin),
  );

  router.get(
    '/renew',
    validator([body('refreshToken').isString().trim().notEmpty()]),
    onlySignInUser({ allowExpiredToken: true }),
    asyncWrapper(authApp.renewAccess),
  );

  return router;
};
