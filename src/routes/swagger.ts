import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerOption } from '../config/swagger';
import logger from '../util/logger';
import { config } from '../config';

const router = Router();

export const swaggerRouter = (): Router => {
  router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerOption));

  const apiAddr = `${config.protocol}://${config.host}:${config.port}`;
  logger.info(`API Document is ready at ${apiAddr}/docs`);

  return router;
};
