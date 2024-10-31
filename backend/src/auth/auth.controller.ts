import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthenticateDTO } from './schemas/authenticate.schema';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  authenticate = async (
    req: Request<object, object, AuthenticateDTO>,
    res: Response,
  ) => {
    const { username, password } = req.body;
    const token = await this.authService.authenticate(username, password);

    if (!token) {
      res.status(401).json({
        message: 'Invalid credentials',
      });
      return;
    }

    res.status(200).json({ token });
  };
}
