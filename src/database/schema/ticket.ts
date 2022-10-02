import mongoose, { Types } from 'mongoose';
import { DB_Collection } from '../../constant';
import { ITicket, MongooseSchema } from '../../types/schema';

const schema: MongooseSchema<ITicket> = {
  price: { type: Number },
  movie: { type: Types.ObjectId, ref: DB_Collection.Movie },
  schedule: { type: Types.ObjectId, ref: DB_Collection.Schedule },
  score: { type: Number },
  createdAt: { type: Date },
};

const Schema = new mongoose.Schema<ITicket>(schema);

export const TicketModel = mongoose.model<ITicket>(DB_Collection.Ticket, Schema);
