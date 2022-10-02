import { _Model } from '.';
import { _TicketModel } from '../database/schema/ticket';
import { ITicket } from '../types/schema';

export class TicketModel extends _Model<ITicket> {
  constructor() {
    super(_TicketModel);
  }
}
