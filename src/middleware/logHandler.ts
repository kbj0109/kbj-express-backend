import morgan, { StreamOptions } from 'morgan';
import { ServerEnv } from '../constant';
import logger from '../util/logger';

const stream: StreamOptions = {
  write: (message) => logger.http(message),
};

const skip = () => {
  const env = process.env.NODE_ENV || ServerEnv.Development;
  return env !== ServerEnv.Development;
};

const logHandler = morgan(':method :url :status - :response-time ms', { stream, skip });

export default logHandler;
