import dotenv from 'dotenv';

dotenv.config();

export const config = {
  host: process.env.HOST || '127.0.0.1',
  port: Number(process.env.PORT || '1234'),

  mongoURL: process.env.MONGO_URL || '',
  mongoDatabase: process.env.MONGO_DATABASE || '',
  mongoUsername: process.env.MONGO_USERNAME || '',
  mongoPassword: process.env.MONGO_PASSWORD || '',
};
