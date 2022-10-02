import { Service } from '.';
import { TicketModel } from '../model/ticket';

export class TicketService {
  private readonly model = new TicketModel();
  private readonly service = new Service(this.model);

  createOne = this.service.createOne;
}
