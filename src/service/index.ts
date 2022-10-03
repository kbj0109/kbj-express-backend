import { ClientSession } from 'mongoose';
import { NotFoundError } from '../constant/error';
import { _Model } from '../model';

export class Service<T> {
  private readonly model: _Model<T>;

  constructor(model: _Model<T>) {
    this.model = model;
  }

  createOne = (data: Omit<T, '_id'>, option?: { transaction?: ClientSession }): ReturnType<_Model<T>['createOne']> => {
    return this.model.createOne(data, option);
  };

  createMany = (
    dataList: Omit<T, '_id'>[],
    option?: { transaction?: ClientSession },
  ): ReturnType<_Model<T>['createMany']> => {
    return this.model.createMany(dataList, option);
  };

  readOne = (condition: Partial<T>, option?: { transaction?: ClientSession }): ReturnType<_Model<T>['readOne']> => {
    return this.model.readOne(condition, option);
  };

  /** 데이터 유무 확인 후, 데이터 리턴 */
  confirmOne = async (condition: Partial<T>, option?: { transaction?: ClientSession }): Promise<T> => {
    const item = await this.model.readOne(condition, option);
    if (!item) throw new NotFoundError();
    return item;
  };

  updateOne = (
    condition: NotEmpty<T>,
    data: Partial<T>,
    option?: { transaction?: ClientSession },
  ): ReturnType<_Model<T>['updateOne']> => {
    return this.model.updateOne(condition, data, option);
  };

  updateMany = (
    condition: NotEmpty<T>,
    data: Partial<T>,
    option?: { transaction?: ClientSession },
  ): ReturnType<_Model<T>['updateMany']> => {
    return this.model.updateMany(condition, data, option);
  };

  deleteOne = (
    condition: NotEmpty<T>,
    option?: { transaction?: ClientSession },
  ): ReturnType<_Model<T>['deleteOne']> => {
    return this.model.deleteOne(condition, option);
  };

  deleteMany = (
    condition: NotEmpty<T>,
    option?: { transaction?: ClientSession },
  ): ReturnType<_Model<T>['deleteMany']> => {
    return this.model.deleteMany(condition, option);
  };

  count = (condition: Partial<T>, option?: { transaction?: ClientSession }): ReturnType<_Model<T>['count']> => {
    return this.model.count(condition, option);
  };

  list = (
    condition: Partial<T>,
    option?: { transaction?: ClientSession; skip?: number; limit?: number },
  ): ReturnType<_Model<T>['list']> => {
    return this.model.list(condition, option);
  };

  listDetail = async (
    condition: SearchCondition,
    option?: { transaction?: ClientSession; skip?: number; limit?: number },
  ): ReturnType<_Model<T>['listDetail']> => {
    return this.model.listDetail(condition, option);
  };

  countDetail = async (
    condition: CountSearchCondition,
    option?: { transaction?: ClientSession },
  ): ReturnType<_Model<T>['count']> => {
    return this.model.countDetail(condition, option);
  };

  readDetail = async (
    condition: SearchCondition,
    option?: { transaction?: ClientSession; skip?: number; limit?: number },
  ): ReturnType<_Model<T>['readDetail']> => {
    return this.model.readDetail(condition, option);
  };
}
