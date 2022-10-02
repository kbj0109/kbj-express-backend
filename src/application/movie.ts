import { MovieService } from '../service/movie';

export class MovieApplication {
  constructor(private readonly movieService: MovieService) {}
}
