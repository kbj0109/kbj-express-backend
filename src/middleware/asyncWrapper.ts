import { Request, Response, NextFunction } from 'express';
import mongoose, { ClientSession } from 'mongoose';
import { Response_T } from '../constant/transactionResponse';

export const asyncWrapper =
  (requestHandler: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await requestHandler(req, res, next);

      res.end();
    } catch (error) {
      next(error);
    }
  };

export const asyncTransactionWrapper =
  (requestHandler: (req: Request, res: Response_T, session: ClientSession) => Promise<void>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const session = await mongoose.startSession();
    session.startTransaction();

    // response를 클라이언트에게 보내기 전에 Transaction 완료를 위해, Response 객체를 커스텀
    const customRes = new Response_T(res, session);

    try {
      await requestHandler(req, customRes, session);

      // * 이후에 클라이언트 요청 처리 후 실행해야 하는 미들웨어가 있다면 해당 명령어로 교체
      // await requestHandler(req, customRes, next, session);
    } catch (error) {
      await session.abortTransaction();
      next(error);
    }
  };
