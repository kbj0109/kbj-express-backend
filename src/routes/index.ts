import { Express } from 'express';
import { NotFoundError } from '../constant/error';
import { config } from '../config';
import { ServerEnv } from '../constant';
import { MovieService } from '../service/movie';
import { ScheduleService } from '../service/schedule';
import { TicketService } from '../service/ticket';
import { UserService } from '../service/user';
import { UserApplication } from '../application/user';
import { ScheduleApplication } from '../application/schedule';
import { MovieApplication } from '../application/movie';
import { TicketApplication } from '../application/ticket';
import { userRouter } from './user';
import { movieRouter } from './movie';
import { ticketRouter } from './ticket';
import { scheduleRouter } from './schedule';
import { swaggerRouter } from './swagger';

const setApiRoute = (app: Express): void => {
  const userService = new UserService();
  const movieService = new MovieService();
  const ticketService = new TicketService();
  const scheduleService = new ScheduleService();

  const userApp = new UserApplication(userService);
  const movieApp = new MovieApplication(movieService);
  const ticketApp = new TicketApplication(ticketService);
  const scheduleApp = new ScheduleApplication(scheduleService);

  app.use('/users', userRouter(userApp));
  app.use('/movies', movieRouter(movieApp));
  app.use('/tickets', ticketRouter(ticketApp));
  app.use('/schedules', scheduleRouter(scheduleApp));

  // * 운영 환경은 API 문서 제거
  if (config.serverEnv !== ServerEnv.Production) {
    app.use('/docs', swaggerRouter());
  }

  app.use('*', (req, _, next) => {
    const apiUrl = `${req.method} - ${req.protocol}://${req.hostname}${req.originalUrl}`;
    const message = `${apiUrl} 존재하지 않는 API 경로입니다`;

    next(new NotFoundError({ message }));
  });
};

export default setApiRoute;
