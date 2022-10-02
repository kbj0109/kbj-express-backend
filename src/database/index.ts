import mongoose from 'mongoose';
import { config } from '../config';
import { ServerEnv } from '../constant';
import { BadRequestError } from '../constant/error';
import logger from '../util/logger';

export class Database {
  private handler: typeof mongoose | undefined;

  constructor(
    private readonly url: string,
    private readonly database: string,
    private readonly username: string,
    private readonly password: string,
  ) {}

  async connect(): Promise<void> {
    this.handler = await mongoose.connect(this.url, {
      dbName: this.database,
      user: this.username,
      pass: this.password,

      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    const message = `MongoDB Database *${this.database.toUpperCase()}* Connected`;
    logger.info(message);
  }

  async disconnect(): Promise<void> {
    if (this.handler) {
      await this.handler.disconnect();
    }
  }

  /** 데이터베이스를 리셋합니다 */
  async resetDatabase(): Promise<void> {
    if (config.serverEnv !== ServerEnv.Test) {
      const message = '테스트 환경에서만 Database 리셋 가능';
      logger.error(message);
      throw new BadRequestError({ message });
    }

    if (this.handler) {
      await this.handler.connection.db.dropDatabase();
    }
  }
}
