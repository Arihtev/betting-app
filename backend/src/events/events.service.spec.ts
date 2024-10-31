import { expect } from 'chai';
import { EventsRepository } from './events.repository';
import { EventsService } from './events.service';
import { EventMapper } from './mappers/event.mapper';
import sinon from 'sinon';
import { Event } from './entities/event.entity';

describe('EventsService', () => {
  let eventsService: EventsService;
  let eventsRepositoryStub: sinon.SinonStubbedInstance<EventsRepository>;

  beforeEach(() => {
    eventsRepositoryStub = sinon.createStubInstance(EventsRepository);
    eventsService = new EventsService(eventsRepositoryStub);
  });

  describe('getAllEvents', () => {
    it('should return all events', async () => {
      const events: Event[] = [
        new Event({
          id: 1,
          type: 'Soccer',
          teamA: 'Team A',
          teamB: 'Team B',
          oddsTeamA: 1.5,
          oddsTeamB: 2.0,
          oddsDraw: 3.0,
          date: new Date(),
        }),
        new Event({
          id: 2,
          type: 'Basketball',
          teamA: 'Team C',
          teamB: 'Team D',
          oddsTeamA: 1.8,
          oddsTeamB: 1.9,
          oddsDraw: 2.5,
          date: new Date(),
        }),
      ];

      eventsRepositoryStub.findAll.resolves(events);

      const result = await eventsService.getAllEvents();

      expect(result).to.deep.equal(events.map(EventMapper.toDto));
    });
  });

  describe('getEventById', () => {
    it('should return an event by id', async () => {
      const event = new Event({
        id: 1,
        type: 'Soccer',
        teamA: 'Team A',
        teamB: 'Team B',
        oddsTeamA: 1.5,
        oddsTeamB: 2.0,
        oddsDraw: 3.0,
        date: new Date(),
      });

      eventsRepositoryStub.findOneBy.resolves(event);

      const result = await eventsService.getEventById(event.id);

      expect(result).to.deep.equal(EventMapper.toDto(event));
    });

    it('should return null if event is not found', async () => {
      eventsRepositoryStub.findOneBy.resolves(null);

      const result = await eventsService.getEventById(1);

      expect(result).to.be.null;
    });
  });
});
