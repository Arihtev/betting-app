import { DataSource } from 'typeorm';
import { Bet } from './entities/bet.entity';
import { BetsRepository } from './bets.repository';
import sinon from 'sinon';
import { expect } from 'chai';
import { SelectionEnum } from '../utils/types';

describe('BetsRepository', () => {
  let betsRepository: BetsRepository;
  let dataSourceStub: sinon.SinonStubbedInstance<DataSource>;

  beforeEach(() => {
    dataSourceStub = sinon.createStubInstance(DataSource);
    betsRepository = new BetsRepository(
      dataSourceStub as unknown as DataSource,
    );
  });

  describe('createAndSave', () => {
    it('should create and save a bet', async () => {
      const betData = {
        stake: 100,
        userId: 1,
        eventId: 1,
        selection: SelectionEnum.TeamA,
        odds: 1.5,
      };
      const createdBet = new Bet(betData);

      const createStub = sinon
        .stub(betsRepository, 'create')
        .returns(createdBet);
      const saveStub = sinon.stub(betsRepository, 'save').resolves(createdBet);

      const result = await betsRepository.createAndSave(betData);

      expect(createStub.calledWith(betData)).to.be.true;
      expect(saveStub.calledWith(createdBet)).to.be.true;
      expect(result).to.equal(createdBet);
    });
  });
});
