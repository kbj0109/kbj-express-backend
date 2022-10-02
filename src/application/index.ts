import express from 'express';
import setApiRoute from '../routes';
import { setMiddlewareAfterRoute, setMiddlewareBeforeRoute } from '../middleware';
import { UserService } from '../service/user';
import { MovieService } from '../service/movie';
import { TicketService } from '../service/ticket';
import { ScheduleService } from '../service/schedule';
import { UserApplication } from './user';
import { MovieApplication } from './movie';
import { TicketApplication } from './ticket';
import { ScheduleApplication } from './schedule';

const server = express();

const userService = new UserService();
const movieService = new MovieService();
const ticketService = new TicketService();
const scheduleService = new ScheduleService();

const user = new UserApplication(userService);
const movie = new MovieApplication(movieService);
const ticket = new TicketApplication(ticketService);
const schedule = new ScheduleApplication(scheduleService);

// # Request Handler 이전 미들웨어
setMiddlewareBeforeRoute(server);

setApiRoute(server, { user, movie, ticket, schedule });

// # Request Handler 이후 미들웨어
setMiddlewareAfterRoute(server);

export default server;
