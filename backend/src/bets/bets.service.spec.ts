import sinon from 'sinon';
import { BetsRepository } from './bets.repository';
import { BetsService } from './bets.service';
import { UsersService } from '../users/users.service';
import { EventsService } from '../events/events.service';
import { CreateBetDTO } from './schemas/create-bet.schema';
import { SelectionEnum } from '../utils/types';
import { expect } from 'chai';
import { EventDto } from '../events/dto/event.dto';
import { Bet } from './entities/bet.entity';
import { User } from '../users/entities/user.entity';
import { BetMapper } from './mappers/bet.mapper';

describe('BetsService', () => {
  let betsService: BetsService;
  let betsRepositoryStub: sinon.SinonStubbedInstance<BetsRepository>;
  let usersServiceStub: sinon.SinonStubbedInstance<UsersService>;
  let eventsServiceStub: sinon.SinonStubbedInstance<EventsService>;

  beforeEach(() => {
    betsRepositoryStub = sinon.createStubInstance(BetsRepository);
    usersServiceStub = sinon.createStubInstance(UsersService);
    eventsServiceStub = sinon.createStubInstance(EventsService);

    betsService = new BetsService(
      betsRepositoryStub,
      usersServiceStub,
      eventsServiceStub,
    );
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('createBet', () => {
    it('should create a new bet', async () => {
      const betData: CreateBetDTO = {
        eventId: 1,
        stake: 20,
        selection: SelectionEnum.TeamA,
      };

      const event: EventDto = {
        id: 1,
        type: 'Soccer',
        teamA: 'Team A',
        teamB: 'Team B',
        date: new Date().toISOString(),
        odds: {
          [SelectionEnum.TeamA]: 1.5,
          [SelectionEnum.TeamB]: 2.0,
          [SelectionEnum.Draw]: 3.0,
        },
      };

      const user = { id: 1, username: 'bob' } as User;

      const createdBet = {
        id: 1,
        userId: user.id,
        odds: event.odds[betData.selection],
        createdAt: new Date(),
        updatedAt: new Date(),
        ...betData,
      } as Bet;

      usersServiceStub.findByUsername.resolves(user);
      eventsServiceStub.getEventById.resolves(event);
      betsRepositoryStub.createAndSave.resolves(createdBet);

      const result = await betsService.createBet(user.username, betData);

      expect(usersServiceStub.findByUsername.calledWith(user.username)).to.be
        .true;
      expect(eventsServiceStub.getEventById.calledWith(betData.eventId)).to.be
        .true;
      expect(
        betsRepositoryStub.createAndSave.calledWith({
          userId: user.id,
          eventId: betData.eventId,
          selection: betData.selection,
          stake: betData.stake,
          odds: event.odds[betData.selection],
        }),
      ).to.be.true;
      expect(result).to.deep.equal(BetMapper.toDto(createdBet));
    });

    it('should throw an error if user is not found', async () => {
      const betData: CreateBetDTO = {
        eventId: 1,
        stake: 20,
        selection: SelectionEnum.TeamA,
      };

      usersServiceStub.findByUsername.resolves(null);

      try {
        await betsService.createBet('bob', betData);
      } catch (error) {
        expect((error as Error).message).to.equal('User not found');
      }
    });

    it('should throw an error if event is not found', async () => {
      const betData: CreateBetDTO = {
        eventId: 1,
        stake: 20,
        selection: SelectionEnum.TeamA,
      };

      usersServiceStub.findByUsername.resolves({
        id: 1,
        username: 'bob',
      } as User);
      eventsServiceStub.getEventById.resolves(null);

      try {
        await betsService.createBet('bob', betData);
      } catch (error) {
        expect((error as Error).message).to.equal('Event not found');
      }
    });
  });
});
