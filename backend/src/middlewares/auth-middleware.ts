import { JwtService } from '../auth/jwt.service';
import { Request, Response, NextFunction } from 'express';

export const authMiddleware =
  (jwtService: JwtService) =>
  (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'] as string;

    if (!authHeader) {
      res.status(401).json({ message: 'Authorization header is missing' });
      return;
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'Token is missing' });
      return;
    }

    try {
      const decodedToken = jwtService.verify(token);
      res.locals.user = decodedToken;

      next();
    } catch (error) {
      console.error(`Invalid token: ${error}`);
      res.status(401).json({
        message: 'Invalid token',
      });
    }
  };
