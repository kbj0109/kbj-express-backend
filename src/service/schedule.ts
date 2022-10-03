import { ClientSession } from 'mongoose';
import { Service } from '.';
import { DuplicatedError } from '../constant/error';
import { ScheduleModel } from '../model/schedule';
import { ISchedule } from '../types/schema';

export class ScheduleService {
  private readonly model = new ScheduleModel();
  private readonly service = new Service(this.model);

  countDetail = this.service.countDetail;
  confirmOne = this.service.confirmOne;

  listDetailWithMovie = async (condition: SearchCondition): ReturnType<ScheduleModel['listDetailWithMovie']> => {
    return this.model.listDetailWithMovie(condition);
  };

  createOne = async (
    data: Omit<ISchedule, '_id'>,
    option?: { transaction?: ClientSession },
  ): ReturnType<ScheduleModel['createOne']> => {
    // 해당 시간, 같은 영화관에 상영 스케줄이 있는지 확인
    const item = await this.service.readDetail({
      exact: { theater: data.theater },
      range: {
        startAt: { gte: data.startAt, lte: data.endAt },
        endAt: { gte: data.startAt, lte: data.endAt },
      },
    });

    if (item) {
      throw new DuplicatedError({ message: '해당 영화관은 지정한 시간에 상영 일정이 있습니다' });
    }

    return this.model.createOne(data, option);
  };
}
