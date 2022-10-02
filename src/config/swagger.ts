import swaggereJsdoc, { Options } from 'swagger-jsdoc';
import { JsonObject } from 'swagger-ui-express';
import { config } from '.';

const option: Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'KBJ-TypeScript-Backend',
      version: '1.0.0',
      description: `${config.serverEnv} 서버 API 문서`,
    },
    host: `${config.protocol}://${config.host}:${config.port}`,
    servers: [{ url: `${config.protocol}://${config.host}:${config.port}` }],
  },
  apis: ['./**/swagger/**/*.yaml'],
};

export const swaggerOption: JsonObject = swaggereJsdoc(option);
