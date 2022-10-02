import { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { otherErrorHandler, productionErrorHandler } from './errorHandler';
import logHandler from './logHandler';
import { config } from '../config';
import { ServerEnv } from '../constant';
import { setUserIfSignIn } from './authHandler';

// * 명확하게 Staging / Development 환경으로 명시되어 있지 않으면 Production 으로 간주한다
const isProductionEnv = !(config.serverEnv === ServerEnv.Development || config.serverEnv === ServerEnv.Staging);

/** Request Handling 이전의 미들웨어 설정 */
const setMiddlewareBeforeRoute = (app: Express): void => {
  app.use(cors({ credentials: true, origin: true }));
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(logHandler);
  app.disable('x-powered-by');
  app.use(helmet());
  app.use(setUserIfSignIn);
};

/** Request Handling 이후의 미들웨어 설정 */
const setMiddlewareAfterRoute = (app: Express): void => {
  app.use(isProductionEnv ? productionErrorHandler : otherErrorHandler);
};

export { setMiddlewareBeforeRoute, setMiddlewareAfterRoute };
