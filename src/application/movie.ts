import { Request, Response } from 'express';
import { ClientSession } from 'mongoose';
import { Response_T } from '../constant/transactionResponse';
import { MovieService } from '../service/movie';
import { refineData } from '../util/dataHandler';

export class MovieApplication {
  constructor(private readonly movieService: MovieService) {}

  listDetail = async (req: Request, res: Response): Promise<void> => {
    const { exact, exactOneOf, include, limit, range, skip, sort } = req.body;

    const list = await this.movieService.listDetail({ exact, exactOneOf, include, range, limit, skip, sort });
    const count = await this.movieService.countDetail({ exact, exactOneOf, include, range });

    res.json({ total: count, list: list.map((one) => refineData(one)) });
  };

  createOne = async (req: Request, res: Response_T, transaction: ClientSession): Promise<void> => {
    const { title, description, actors, genres } = req.body;
    const createdAt = new Date();

    const item = await this.movieService.createOne({ title, description, actors, genres, createdAt }, { transaction });

    res.json(refineData(item));
  };

  readOne = async (req: Request, res: Response): Promise<void> => {
    const { movieId } = req.params;

    const item = await this.movieService.confirmOne({ _id: movieId });

    res.json(refineData(item, { remove: ['password'] }));
  };
}
