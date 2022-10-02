import server from './application';
import { Express } from 'express';
import { config } from './config';
import { Database } from './database';
import logger from './util/logger';
import { Server } from 'http';

const closeServer = (server: Server) => {
  return new Promise<void>((resolve, reject) => {
    server.close((err) => {
      if (err) return reject(err);

      return resolve();
    });
  });
};

const startServer = async (serverApp: Express) => {
  const dbHandler = new Database(config.mongoURL, config.mongoDatabase, config.mongoUsername, config.mongoPassword);
  await dbHandler.connect();

  const server = serverApp.listen(config.port, () => {
    const ipAddress = config.host;

    logger.info(`Server is listening on http://${ipAddress}:${config.port}`);
    logger.info(`NODE_ENV is - ${config.nodeEnv}`);
  });

  process.on('uncaughtException', async (err) => {
    logger.warn(err);
    logger.error('Await 하지 않은 Exception - uncaughtException');

    await closeServer(server);
    await dbHandler.disconnect();

    process.exit(1);
  });
};

startServer(server);
