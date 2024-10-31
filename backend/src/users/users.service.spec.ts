import { expect } from 'chai';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import sinon from 'sinon';
import { User } from './entities/user.entity';

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepositoryStub: sinon.SinonStubbedInstance<UsersRepository>;

  beforeEach(() => {
    usersRepositoryStub = sinon.createStubInstance(UsersRepository);
    usersService = new UsersService(usersRepositoryStub);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('findByUsername', () => {
    it('should return a user by username', async () => {
      const username = 'bob';
      const user = { id: 1, username } as User;

      usersRepositoryStub.findByUsername.resolves(user);

      const result = await usersService.findByUsername(username);

      expect(usersRepositoryStub.findByUsername.calledWith(username)).to.be
        .true;
      expect(result).to.equal(user);
    });

    it('should return null if user is not found', async () => {
      const username = 'bob';

      usersRepositoryStub.findByUsername.resolves(null);

      const result = await usersService.findByUsername(username);

      expect(usersRepositoryStub.findByUsername.calledWith(username)).to.be
        .true;
      expect(result).to.be.null;
    });
  });
});
