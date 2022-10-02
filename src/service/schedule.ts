import { Service } from '.';
import { ScheduleModel } from '../model/schedule';

export class ScheduleService {
  private readonly model = new ScheduleModel();
  private readonly service = new Service(this.model);

  createOne = this.service.createOne;
}
