import { expect } from 'chai';
import { EventDto } from './dto/event.dto';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import sinon from 'sinon';
import * as httpMocks from 'node-mocks-http';

describe('EventsController', () => {
  let eventsController: EventsController;
  let eventsServiceStub: sinon.SinonStubbedInstance<EventsService>;

  beforeEach(() => {
    eventsServiceStub = sinon.createStubInstance(EventsService);
    eventsController = new EventsController(eventsServiceStub);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('getAllEvents', () => {
    it('should return all events', async () => {
      const events: EventDto[] = [
        {
          id: 1,
          type: 'Soccer',
          teamA: 'Team A',
          teamB: 'Team B',
          odds: {
            teamA: 1.5,
            teamB: 2.0,
            draw: 3.0,
          },
          date: new Date().toISOString(),
        },
        {
          id: 2,
          type: 'Basketball',
          teamA: 'Team C',
          teamB: 'Team D',
          odds: {
            teamA: 1.8,
            teamB: 1.9,
            draw: 2.5,
          },
          date: new Date().toISOString(),
        },
      ];

      eventsServiceStub.getAllEvents.resolves(events);

      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/api/bets',
      });

      const res = httpMocks.createResponse();

      await eventsController.getAllEvents(req, res);

      expect(res.statusCode).to.equal(200);
      expect(res._getData()).to.equal(JSON.stringify({ events }));
    });
  });
});
