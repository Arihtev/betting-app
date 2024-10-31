import { UsersService } from '../users/users.service';
import { BetsRepository } from './bets.repository';
import { Bet } from './entities/bet.entity';
import { CreateBetDTO } from './schemas/create-bet.schema';
import { BetMapper } from './mappers/bet.mapper';
import { BetDto } from './dto/bet.dto';
import { EventsService } from '../events/events.service';

export class BetsService {
  constructor(
    private readonly betsRepository: BetsRepository,
    private readonly usersService: UsersService,
    private readonly eventsService: EventsService,
  ) {}

  async createBet(username: string, betData: CreateBetDTO): Promise<BetDto> {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new Error('User not found');
    }

    const event = await this.eventsService.getEventById(betData.eventId);
    if (!event) {
      throw new Error('Event not found');
    }

    const newBet: Partial<Bet> = {
      userId: user.id,
      eventId: betData.eventId,
      selection: betData.selection,
      stake: betData.stake,
      odds: event.odds[betData.selection],
    };

    const createdBet = await this.betsRepository.createAndSave(newBet);
    return BetMapper.toDto(createdBet);
  }
}
