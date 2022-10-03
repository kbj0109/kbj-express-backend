import app from '../src/application';
import { API, getRequest, getSampleMovieData, setupTestDB } from '.';
import { moviePropList } from '../src/database/schema/movie';
import { IMovie } from '../src/types/schema';

const request = getRequest(app);
setupTestDB();

const sample = getSampleMovieData();

describe(`Movie 테스트`, () => {
  describe('등록 테스트', () => {
    test('[성공] 영화 등록', async () => {
      const res = await request.post(API.MovieCreate).send(sample);
      expect(res.statusCode).toBe(200);

      moviePropList.forEach((prop) => {
        expect(res.body).toHaveProperty(prop);
      });
    });
  });

  describe('조회 테스트', () => {
    let movieId = '';

    beforeAll(async () => {
      const res = await request.post(API.MovieCreate).send(sample);

      expect(res.statusCode).toBe(200);
      movieId = res.body._id;
    });

    test('[성공] 영화 조회', async () => {
      const res = await request.get(API.MovieRead(movieId));
      expect(res.statusCode).toBe(200);

      moviePropList.forEach((prop) => {
        expect(res.body).toHaveProperty(prop);
      });
    });

    test('[실패] 존재하지 않는 영화', async () => {
      const res = await request.get(API.MovieRead('111111111111111111111111'));
      expect(res.statusCode).toBe(404);
    });
  });

  describe('목록 테스트', () => {
    const titleList = ['동방불패 1편', '동방불패 2편', '동방불패 3편', '동방불패 4편', '스타워즈 1편', '스타워즈 2편'];

    beforeAll(async () => {
      await Promise.all(
        titleList.map((title) =>
          request
            .post(API.MovieCreate)
            .send({ ...sample, title })
            .then((res) => expect(res.statusCode).toBe(200)),
        ),
      );
    });

    test('[성공] 영화 목록', async () => {
      const res1 = await request.post(API.MovieList).send({ include: { title: '동방불패' } });
      expect(res1.statusCode).toBe(200);
      expect(res1.body.total).toBe(4);
      expect(res1.body.list.length).toBe(4);

      res1.body.list.map((movie: IMovie) => {
        expect(movie.title).toContain('동방불패');
        moviePropList.forEach((prop) => {
          expect(movie).toHaveProperty(prop);
        });
      });

      const res2 = await request.post(API.MovieList).send({ include: { title: '스타' }, limit: 1 });
      expect(res2.statusCode).toBe(200);
      expect(res2.body.total).toBe(2);
      expect(res2.body.list.length).toBe(1);

      res2.body.list.map((movie: IMovie) => {
        expect(movie.title).toContain('스타');
        moviePropList.forEach((prop) => {
          expect(movie).toHaveProperty(prop);
        });
      });
    });
  });
});
