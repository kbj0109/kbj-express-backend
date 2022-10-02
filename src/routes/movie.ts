import { Router } from 'express';
import { MovieApplication } from '../application/movie';

const router = Router();

export const movieRouter = (movieApp: MovieApplication): Router => {
  // router.post('/', movieApp.createOne);

  return router;
};
