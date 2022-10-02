import { UserService } from '../service/user';
import { Request, Response } from 'express';
import { AuthService } from '../service/auth';

export class AuthApplication {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  signin = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    const user = await this.userService.confirmOne({ username });

    const { accessToken, refreshToken } = await this.authService.createAccess(password, user.password, username);

    res.json({ accessToken, refreshToken });
  };

  renewAccess = async (req: Request, res: Response): Promise<void> => {
    const { username } = req.user!;
    const { refreshToken: orgRefreshToken } = req.body;

    await this.userService.confirmOne({ username });

    const result = await this.authService.renewAccessToken(orgRefreshToken, { username });

    res.json({ accessToken: result.accessToken, refreshToken: result.refreshToken });
  };
}
