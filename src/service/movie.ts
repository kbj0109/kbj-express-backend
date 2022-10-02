import { Service } from '.';
import { MovieModel } from '../model/movie';

export class MovieService {
  private readonly model = new MovieModel();
  private readonly service = new Service(this.model);

  createOne = this.service.createOne;
}
