import { Router } from 'express';
import { EventsController } from './events.controller';
import { JwtService } from '../auth/jwt.service';

export class EventsRouter {
  private readonly router: Router;

  constructor(
    private readonly jwtService: JwtService,
    private readonly eventsController: EventsController,
  ) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.eventsController.getAllEvents);
  }

  public getRouter(): Router {
    return this.router;
  }
}
