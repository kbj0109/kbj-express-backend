import mongoose from 'mongoose';
import { DB_Collection } from '../../constant';
import { IUser, MongooseSchema } from '../../types/schema';

const schema: MongooseSchema<IUser> = {
  username: { type: String, unique: true },
  password: { type: String },
  name: { type: String },
  createdAt: { type: Date },
};

const Schema = new mongoose.Schema<IUser>(schema);

Schema.index({ username: 1 });

export const _UserModel = mongoose.model<IUser>(DB_Collection.User, Schema);
