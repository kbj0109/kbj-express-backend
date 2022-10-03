import { Request, Response } from 'express';
import { ClientSession } from 'mongoose';
import { Response_T } from '../constant/transactionResponse';
import { MovieService } from '../service/movie';
import { ScheduleService } from '../service/schedule';
import { refineData } from '../util/dataHandler';

export class ScheduleApplication {
  constructor(private readonly scheduleService: ScheduleService, private readonly movieService: MovieService) {}

  listDetail = async (req: Request, res: Response): Promise<void> => {
    const { exact, exactOneOf, include, limit, range, skip, sort } = req.body;

    const [list, count] = await Promise.all([
      this.scheduleService.listDetail({ exact, exactOneOf, include, range, limit, skip, sort }),
      this.scheduleService.countDetail({ exact, exactOneOf, include, range }),
    ]);

    res.json({ total: count, list: list.map((one) => refineData(one)) });
  };

  createOne = async (req: Request, res: Response_T, transaction: ClientSession): Promise<void> => {
    const { movieId, startAt, endAt, theater } = req.body;
    const createdAt = new Date();

    const movie = await this.movieService.confirmOne({ _id: movieId });

    const item = await this.scheduleService.createOne(
      { movie: movieId, startAt, endAt, theater, createdAt },
      { transaction },
    );

    res.json(refineData(item, { set: { movie: refineData(movie) } }));
  };

  readOne = async (req: Request, res: Response): Promise<void> => {
    const { movieId } = req.params;

    const item = await this.scheduleService.confirmOne({ _id: movieId });

    res.json(refineData(item));
  };
}
