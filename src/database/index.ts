import mongoose from 'mongoose';
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
}
