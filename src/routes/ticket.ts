import { Router } from 'express';
import { TicketApplication } from '../application/ticket';
import { config } from '../config';

const router = Router();

export const ticketRouter = (ticketApp: TicketApplication): Router => {
  // router.post('/', userApp.createOne);
  if (!config.serverEnv) console.log(ticketApp);

  return router;
};
