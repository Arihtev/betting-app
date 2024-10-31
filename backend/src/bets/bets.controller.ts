import { Request, Response } from 'express';
import { BetsService } from './bets.service';
import { CreateBetDTO } from './schemas/create-bet.schema';
import { UserPayload } from '../auth/interfaces/user.interface';

export class BetsController {
  constructor(private readonly betsService: BetsService) {}

  createBet = async (
    req: Request<object, object, CreateBetDTO>,
    res: Response<object, { user: UserPayload }>,
  ) => {
    const user = res.locals.user;

    try {
      const bet = await this.betsService.createBet(user.username, req.body);
      res.status(201).json(bet);
    } catch (error) {
      if (
        error instanceof Error &&
        (error.message === 'User not found' ||
          error.message === 'Event not found')
      ) {
        console.error(error.message);
        res.status(404).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  };

  // async getAllBetsForEvent(req: Request, res: Response) {
  //   const bets = await this.betsService.findAll();
  //   res.json(bets);
  // }
}
