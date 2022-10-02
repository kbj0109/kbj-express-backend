import mongoose, { Types } from 'mongoose';
import { DB_Collection } from '../../constant';
import { ISchedule, MongooseSchema } from '../../types/schema';

const schema: MongooseSchema<ISchedule> = {
  movie: { type: Types.ObjectId, ref: DB_Collection.Movie },
  startAt: { type: Date },
  endAt: { type: Date },
  theater: { type: String },
  createdAt: { type: Date },
};

const Schema = new mongoose.Schema<ISchedule>(schema);

Schema.index({ startAt: 1 });
Schema.index({ movie: 1 });

export const _ScheduleModel = mongoose.model<ISchedule>(DB_Collection.Schedule, Schema);
