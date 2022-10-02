import { Express } from 'express';
import { NotFoundError } from '../constant/error';
import { config } from '../config';
import { ServerEnv } from '../constant';
import { userRouter } from './user';
import { movieRouter } from './movie';
import { ticketRouter } from './ticket';
import { scheduleRouter } from './schedule';
import { swaggerRouter } from './swagger';
import { UserApplication } from '../application/user';
import { MovieApplication } from '../application/movie';
import { TicketApplication } from '../application/ticket';
import { ScheduleApplication } from '../application/schedule';

const setApiRoute = (
  app: Express,
  application: {
    user: UserApplication;
    movie: MovieApplication;
    ticket: TicketApplication;
    schedule: ScheduleApplication;
  },
) => {
  app.use('/users', userRouter(application.user));
  app.use('/movies', movieRouter(application.movie));
  app.use('/tickets', ticketRouter(application.ticket));
  app.use('/schedules', scheduleRouter(application.schedule));

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
