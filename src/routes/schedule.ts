import { Router } from 'express';
import { ScheduleApplication } from '../application/schedule';

const router = Router();

export const scheduleRouter = (scheduleApp: ScheduleApplication): Router => {
  // router.post('/', userApp.createOne);

  return router;
};
