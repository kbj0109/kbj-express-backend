import { Service } from '.';
import { MovieModel } from '../model/movie';

export class MovieService {
  private readonly model = new MovieModel();
  private readonly service = new Service(this.model);

  listDetail = this.service.listDetail;
  countDetail = this.service.countDetail;
  createOne = this.service.createOne;
  confirmOne = this.service.confirmOne;
}
