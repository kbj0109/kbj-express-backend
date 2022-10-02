import { Types } from 'mongoose';
import { AuthType, Genre, Theater } from '../constant';

type MongooseSchema<T> = {
  [k in keyof Required<Omit<T, '_id'>>]: any;
};

interface IUser {
  _id: string;
  username: string;
  password: string;
  name: string;
  createdAt: Date;
}

export interface IAuthCode {
  _id: string;
  username: string;
  code: string;
  type: AuthType;
  createdAt: Date;
  expiredAt: Date;
}

interface IMovie {
  _id: string;
  title: string;
  description: string;
  actors: string[]; // 출연진
  genres: Genre[]; // 영화 장르
  createdAt: Date;
}

interface ISchedule {
  _id: string;
  movie: Types.ObjectId;
  startAt: Date; // 시작 시간
  endAt: Date; // 종료 시간
  theater: Theater; // 상영 영화관
  createdAt: Date;
}

interface ITicket {
  _id: string;
  price: number;
  movie: Types.ObjectId;
  schedule: Types.ObjectId; // 상영 스케줄
  score?: number; // 시청 후 기록되는 후기 점수
  createdAt: Date;
}
