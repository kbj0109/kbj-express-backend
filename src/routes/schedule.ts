import { Router } from 'express';
import { body, param } from 'express-validator';
import { ScheduleApplication } from '../application/schedule';
import { TheaterList } from '../constant';
import { asyncTransactionWrapper, asyncWrapper } from '../middleware/asyncWrapper';
import { isObjectId, isRange, isSort, validator } from '../middleware/paramValidator';

const router = Router();

export const scheduleRouter = (scheduleApp: ScheduleApplication): Router => {
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
    asyncWrapper(scheduleApp.listDetail),
  );

  router.post(
    '/',
    validator([
      body('movieId').custom(isObjectId),
      body('startAt').isDate().toDate(),
      body('endAt').isDate().toDate(),
      body('theater').isIn(TheaterList),
    ]),
    asyncTransactionWrapper(scheduleApp.createOne),
  );

  router.get(
    '/:scheduleId',
    validator([param('scheduleId').isString().trim().notEmpty()]),
    asyncWrapper(scheduleApp.readOne),
  );

  return router;
};
