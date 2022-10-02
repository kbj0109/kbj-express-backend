import { Router } from 'express';
import { ScheduleApplication } from '../application/schedule';
import { config } from '../config';

const router = Router();

export const scheduleRouter = (scheduleApp: ScheduleApplication): Router => {
  // router.post('/', userApp.createOne);

  if (!config.serverEnv) console.log(scheduleApp);

  return router;
};
