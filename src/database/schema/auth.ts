import mongoose from 'mongoose';
import { DB_Collection } from '../../constant';
import { IAuthCode, MongooseSchema } from '../../types/schema';

const schema: MongooseSchema<IAuthCode> = {
  username: { type: String },
  code: { type: String },
  type: { type: Number },
  createdAt: { type: Date },
  expiredAt: { type: Date },
};

const Schema = new mongoose.Schema<IAuthCode>(schema);

Schema.index({ username: 1 });

export const _AuthCodeModel = mongoose.model<IAuthCode>(DB_Collection.Auth, Schema);
