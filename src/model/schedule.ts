import { _Model } from '.';
import { DB_Collection } from '../constant';
import { _ScheduleModel } from '../database/schema/schedule';
import { IMovie, ISchedule } from '../types/schema';
import { getSearchQuery } from '../util/query';

export class ScheduleModel extends _Model<ISchedule> {
  constructor() {
    super(_ScheduleModel);
  }

  listDetailWithMovie = async (
    condition: SearchCondition,
  ): Promise<(Omit<ISchedule, 'movie'> & { movie: IMovie })[]> => {
    return _ScheduleModel.aggregate([
      {
        $lookup: {
          from: DB_Collection.Movie,
          localField: 'movie',
          foreignField: '_id',
          as: DB_Collection.Movie,
        },
      },
      ...getSearchQuery(condition),
    ]);
  };
}
