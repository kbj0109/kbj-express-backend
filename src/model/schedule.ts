import { _Model } from '.';
import { _ScheduleModel } from '../database/schema/schedule';
import { ISchedule } from '../types/schema';

export class ScheduleModel extends _Model<ISchedule> {
  constructor() {
    super(_ScheduleModel);
  }
}
