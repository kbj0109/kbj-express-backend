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
import { AuthApplication } from '../application/auth';
import { authRouter } from './auth';

const setApiRoute = (
  server: Express,
  app: {
    user: UserApplication;
    auth: AuthApplication;
    movie: MovieApplication;
    ticket: TicketApplication;
    schedule: ScheduleApplication;
  },
): void => {
  server.use('/users', userRouter(app.user));
  server.use('/auth', authRouter(app.auth));
  server.use('/movies', movieRouter(app.movie));
  server.use('/tickets', ticketRouter(app.ticket));
  server.use('/schedules', scheduleRouter(app.schedule));

  // * 운영 환경은 API 문서 제거
  if (config.serverEnv !== ServerEnv.Production) {
    server.use('/docs', swaggerRouter());
  }

  server.use('*', (req, _, next) => {
    const apiUrl = `${req.method} - ${req.protocol}://${req.hostname}${req.originalUrl}`;
    const message = `${apiUrl} 존재하지 않는 API 경로입니다`;

    next(new NotFoundError({ message }));
  });
};

export default setApiRoute;
