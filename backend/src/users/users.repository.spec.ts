import { expect } from 'chai';
import { User } from './entities/user.entity';
import sinon from 'sinon';
import { UsersRepository } from './users.repository';
import { DataSource } from 'typeorm';

describe('UsersRepository', () => {
  let usersRepository: UsersRepository;
  let dataSourceStub: sinon.SinonStubbedInstance<DataSource>;

  beforeEach(() => {
    dataSourceStub = sinon.createStubInstance(DataSource);
    usersRepository = new UsersRepository(
      dataSourceStub as unknown as DataSource,
    );
  });

  describe('findByUsername', () => {
    it('should find a user by username', async () => {
      const user = { id: 1, username: 'bob' } as User;
      const findOneStub = sinon.stub(usersRepository, 'findOne').resolves(user);

      const result = await usersRepository.findByUsername(user.username);

      expect(
        findOneStub.calledWith({
          where: { username: user.username },
          relations: [],
        }),
      ).to.be.true;
      expect(result).to.equal(user);
    });
  });
});
