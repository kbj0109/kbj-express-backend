import { TicketService } from '../service/ticket';

export class TicketApplication {
  constructor(private readonly ticketService: TicketService) {}
}
