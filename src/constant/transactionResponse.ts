import { Response } from 'express';
import { ClientSession } from 'mongoose';

/** Transaction 적용을 위해, 커밋 적용을 위한 커스텀 Response */
export class Response_T {
  constructor(private readonly originalResponse: Response, private readonly session: ClientSession) {}

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  json = async (data?: any): Promise<void> => {
    // # 기존의 res.json 이 실행되기 전에 커밋을 완료
    await this.session.commitTransaction();
    this.session.endSession();

    this.originalResponse.json(data);
  };
}
