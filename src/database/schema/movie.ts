import mongoose from 'mongoose';
import { DB_Collection } from '../../constant';
import { IMovie, MongooseSchema } from '../../types/schema';

const schema: MongooseSchema<IMovie> = {
  title: { type: String },
  description: { type: String },
  actors: [{ type: String }],
  genre: [{ type: String }],
  createdAt: { type: Date },
};

const Schema = new mongoose.Schema<IMovie>(schema);

Schema.index({ createdAt: 1 });

export const _MovieModel = mongoose.model<IMovie>(DB_Collection.Movie, Schema);
