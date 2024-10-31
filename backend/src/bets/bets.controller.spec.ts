import { BetsController } from './bets.controller';
import { BetsService } from './bets.service';
import { expect } from 'chai';
import * as sinon from 'sinon';
import * as httpMocks from 'node-mocks-http';
import { CreateBetDTO } from './schemas/create-bet.schema';
import { SelectionEnum } from '../utils/types';
import { BetDto } from './dto/bet.dto';
import { Response } from 'express';

describe('BetsController', () => {
  let betsController: BetsController;
  let betsServiceStub: sinon.SinonStubbedInstance<BetsService>;

  beforeEach(async () => {
    betsServiceStub = sinon.createStubInstance(BetsService);
    betsController = new BetsController(betsServiceStub);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('createBet', () => {
    it('should create a new bet', async () => {
      const createBetBody: CreateBetDTO = {
        eventId: 1,
        stake: 20,
        selection: SelectionEnum.TeamA,
      };
      const user = { username: 'bob' };

      const createdBet = {
        userId: 1,
        odds: 1.5,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...createBetBody,
      } as BetDto;

      betsServiceStub.createBet.resolves(createdBet);

      const request = httpMocks.createRequest({
        method: 'POST',
        url: '/api/bets',
        body: createBetBody,
      });
      const response = httpMocks.createResponse({
        locals: { user },
      }) as httpMocks.MockResponse<
        Response<any, { user: { username: string } }>
      >;

      await betsController.createBet(request, response);

      expect(betsServiceStub.createBet.calledWith(user.username, createBetBody))
        .to.be.true;
      expect(response.statusCode).to.equal(201);
      expect(response._getData()).to.equal(JSON.stringify(createdBet));
    });
  });
});
