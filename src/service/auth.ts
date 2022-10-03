import ms from 'ms';
import { Service } from '.';
import { config } from '../config';
import { AuthType } from '../constant';
import { BadRequestError, ExpiredTokenError } from '../constant/error';
import { AuthCodeModel } from '../model/auth';
import { IUser } from '../types/schema';
import { compareEncryptValue, createJwtToken, openJwtToken } from '../util/auth';
import { getChangeDate } from '../util/date';

export class AuthService {
  private readonly model = new AuthCodeModel();
  private readonly service = new Service(this.model);

  private createOne = this.service.createOne;
  private readOne = this.service.readOne;

  createAccess = async (
    loginPassword: string,
    userPassword: IUser['password'],
    user: Pick<IUser, 'username'>,
  ): Promise<{ accessToken: string; refreshToken: string }> => {
    const isVerified = await compareEncryptValue(loginPassword, userPassword);
    if (!isVerified) {
      throw new BadRequestError({ message: '잘못된 비밀번호 입니다' });
    }

    const accessToken = createJwtToken(user, config.accessExpired);
    const refreshToken = createJwtToken(user, config.refreshExpired);

    await this.createOne({
      username: user.username,
      code: refreshToken,
      type: AuthType.REFRESH_TOKEN,
      createdAt: new Date(),
      expiredAt: getChangeDate(new Date(), { add: { milliseconds: ms(config.refreshExpired) } }),
    });

    return { accessToken, refreshToken };
  };

  renewAccessToken = async (
    refreshToken: string,
    user: Pick<IUser, 'username'>,
  ): Promise<{ accessToken: string; refreshToken?: string }> => {
    const username = openJwtToken(refreshToken).username;
    const now = new Date();

    const item = await this.readOne({ username, code: refreshToken });

    if (!username || !item || item.expiredAt < now) {
      this.service.deleteOne({ username, code: refreshToken, type: AuthType.REFRESH_TOKEN });
      throw new ExpiredTokenError();
    }

    const accessToken = createJwtToken(user, config.accessExpired);

    // * RefreshToken 남은 유효시간이 1/3 일 때 Refresh Token 도 갱신
    let newRefreshToken;
    const validTokenTime = ms(config.refreshExpired);
    const timeToRenewRefreshToken = getChangeDate(item.expiredAt, { add: { milliseconds: -(validTokenTime / 3) } });

    if (timeToRenewRefreshToken < now) {
      newRefreshToken = createJwtToken(user, config.refreshExpired);

      await Promise.all([
        this.createOne({
          username,
          code: newRefreshToken,
          createdAt: now,
          expiredAt: getChangeDate(now, { add: { milliseconds: validTokenTime } }),
          type: AuthType.REFRESH_TOKEN,
        }),
        this.service.deleteOne({ username, code: refreshToken, type: AuthType.REFRESH_TOKEN }),
      ]);
    }

    return { accessToken, refreshToken: newRefreshToken };
  };
}
