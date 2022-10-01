import express from 'express';
import setApiRoute from '../routes';
import { setMiddlewareAfterRoute, setMiddlewareBeforeRoute } from '../middleware';

const app = express();

// # Request Handler 이전 미들웨어
setMiddlewareBeforeRoute(app);

setApiRoute(app);

// # Request Handler 이후 미들웨어
setMiddlewareAfterRoute(app);

export default app;
