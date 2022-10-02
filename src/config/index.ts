import dotenv from 'dotenv';
import { ServerEnv } from '../constant';

dotenv.config();

export const config = {
  nodeEnv: process.env.NODE_ENV || ServerEnv.Development,
  serverEnv: process.env.SERVER_ENV || ServerEnv.Development,

  protocol: process.env.PROTOCOL || 'http',
  host: process.env.HOST || '127.0.0.1',
  port: Number(process.env.PORT || '1234'),

  mongoURL: process.env.MONGO_URL || '',
  mongoDatabase: process.env.MONGO_DATABASE || '',
  mongoUsername: process.env.MONGO_USERNAME || '',
  mongoPassword: process.env.MONGO_PASSWORD || '',
};
