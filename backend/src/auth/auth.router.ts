import { Router } from 'express';
import { AuthController } from './auth.controller';
import { validatePayload } from '../middlewares/validate-payload';
import { authenticateSchema } from './schemas/authenticate.schema';

export class AuthRouter {
  private readonly router: Router;

  constructor(private readonly authController: AuthController) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      '/',
      validatePayload(authenticateSchema),
      this.authController.authenticate,
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
