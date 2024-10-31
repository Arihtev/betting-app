import express, { Application } from 'express';
import cors from 'cors';
import { AppDataSource } from './database/data-source';
import { EventsService } from './events/events.service';
import { EventsController } from './events/events.controller';
import { EventsRepository } from './events/events.repository';
import { UsersRepository } from './users/users.repository';
import { UsersService } from './users/users.service';
import { EventsRouter } from './events/events.router';
import { JwtService } from './auth/jwt.service';
import { config } from './utils/config';
import { AuthService } from './auth/auth.service';
import { CryptService } from './auth/crypt.service';
import { AuthController } from './auth/auth.controller';
import { AuthRouter } from './auth/auth.router';
import { BetsService } from './bets/bets.service';
import { BetsRepository } from './bets/bets.repository';
import { BetsController } from './bets/bets.controller';
import { BetsRouter } from './bets/bets.router';

const app: Application = express();

export const initializeApp = async (): Promise<Application> => {
  await AppDataSource.initialize();

  const eventsRepository = new EventsRepository(AppDataSource);
  const usersRepository = new UsersRepository(AppDataSource);
  const betsRepository = new BetsRepository(AppDataSource);

  const jwtService = new JwtService(config);
  const cryptService = new CryptService();
  const usersService = new UsersService(usersRepository);
  const authService = new AuthService(jwtService, usersService, cryptService);
  const eventsService = new EventsService(eventsRepository);
  const betsService = new BetsService(
    betsRepository,
    usersService,
    eventsService,
  );

  const eventsController = new EventsController(eventsService);
  const authController = new AuthController(authService);
  const betsController = new BetsController(betsService);

  const eventsRouter = new EventsRouter(jwtService, eventsController);
  const authRouter = new AuthRouter(authController);
  const betsRouter = new BetsRouter(jwtService, betsController);

  app.use(express.json());
  app.use(cors());

  app.use('/api/events', eventsRouter.getRouter());
  app.use('/api/auth', authRouter.getRouter());
  app.use('/api/bets', betsRouter.getRouter());

  app.use((req, res) => {
    res.status(404).send({ message: 'Not Found' });
  });

  return app;
};
