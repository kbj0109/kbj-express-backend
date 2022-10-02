import { Express } from 'express';
import { NotFoundError } from '../constant/error';

const setApiRoute = (app: Express): void => {
  //

  app.use('*', (req, _, next) => {
    const apiUrl = `${req.method} - ${req.protocol}://${req.hostname}${req.originalUrl}`;
    const message = `${apiUrl} 존재하지 않는 API 경로입니다`;

    next(new NotFoundError({ message }));
  });
};

export default setApiRoute;
