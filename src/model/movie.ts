import { _Model } from '.';
import { _MovieModel } from '../database/schema/movie';
import { IMovie } from '../types/schema';

export class MovieModel extends _Model<IMovie> {
  constructor() {
    super(_MovieModel);
  }
}
