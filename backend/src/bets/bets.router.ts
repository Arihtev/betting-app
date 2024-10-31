import { Router } from 'express';
import { BetsController } from './bets.controller';
import { authMiddleware } from '../middlewares/auth-middleware';
import { JwtService } from '../auth/jwt.service';
import { validatePayload } from '../middlewares/validate-payload';
import { createBetSchema } from './schemas/create-bet.schema';

export class BetsRouter {
  private readonly router: Router;

  constructor(
    private readonly jwtService: JwtService,
    private readonly betsController: BetsController,
  ) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      '/',
      authMiddleware(this.jwtService),
      validatePayload(createBetSchema),
      this.betsController.createBet,
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
