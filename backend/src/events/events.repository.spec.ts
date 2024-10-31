import { expect } from 'chai';
import { DataSource } from 'typeorm';
import { EventsRepository } from './events.repository';
import sinon from 'sinon';
import { Event } from './entities/event.entity';

describe('EventsRepository', () => {
  let eventsRepository: EventsRepository;
  let dataSourceStub: sinon.SinonStubbedInstance<DataSource>;

  beforeEach(() => {
    dataSourceStub = sinon.createStubInstance(DataSource);
    eventsRepository = new EventsRepository(
      dataSourceStub as unknown as DataSource,
    );
  });

  describe('findAll', () => {
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
      const findStub = sinon.stub(eventsRepository, 'find').resolves(events);

      const result = await eventsRepository.findAll();

      expect(findStub.called).to.be.true;
      expect(result).to.equal(events);
    });
  });
});
