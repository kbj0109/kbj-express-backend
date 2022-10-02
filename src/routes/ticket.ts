import { Router } from 'express';
import { TicketApplication } from '../application/ticket';

const router = Router();

export const ticketRouter = (ticketApp: TicketApplication): Router => {
  // router.post('/', userApp.createOne);

  return router;
};
