import { Router } from 'express';
import { MovieApplication } from '../application/movie';
import { config } from '../config';

const router = Router();

export const movieRouter = (movieApp: MovieApplication): Router => {
  // router.post('/', movieApp.createOne);
  if (!config.serverEnv) console.log(movieApp);

  return router;
};
