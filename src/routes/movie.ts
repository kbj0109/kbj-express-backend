import { Router } from 'express';
import { body, param } from 'express-validator';
import { MovieApplication } from '../application/movie';
import { GenreList } from '../constant';
import { asyncTransactionWrapper, asyncWrapper } from '../middleware/asyncWrapper';
import { isObjectId, isRange, isSort, validator } from '../middleware/paramValidator';

const router = Router();

export const movieRouter = (movieApp: MovieApplication): Router => {
  router.post(
    '/list',
    validator([
      body('include').optional().isObject(),
      body('exact').optional().isObject(),
      body('exactOneOf').optional().isArray(),
      body('range').optional().isObject().custom(isRange),
      body('sort').optional().isObject().custom(isSort),
      body('skip').optional().isInt().toInt(),
      body('limit').optional().isInt().toInt(),
    ]),
    asyncWrapper(movieApp.listDetail),
  );

  router.post(
    '/',
    validator([
      body('title').isString().trim().notEmpty(),
      body('description').isString().trim(),
      body('actors').isArray(),
      body('actors.*').isString().trim().notEmpty(),
      body('genres').isArray(),
      body('genres.*').isIn(GenreList),
    ]),
    asyncTransactionWrapper(movieApp.createOne),
  );

  router.get('/:movieId', validator([param('movieId').custom(isObjectId)]), asyncWrapper(movieApp.readOne));

  return router;
};
