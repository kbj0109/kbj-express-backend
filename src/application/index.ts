import express from 'express';
import setApiRoute from '../routes';

const app = express();

setApiRoute(app);

export default app;
