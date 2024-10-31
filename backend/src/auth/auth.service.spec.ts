import { expect } from 'chai';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import * as sinon from 'sinon';
import { CryptService } from './crypt.service';
import { JwtService } from './jwt.service';
import { User } from '../users/entities/user.entity';

describe('AuthService', () => {
  let authService: AuthService;
  let usersServiceStub: sinon.SinonStubbedInstance<UsersService>;
  let jwtServiceStub: sinon.SinonStubbedInstance<JwtService>;
  let cryptServiceStub: sinon.SinonStubbedInstance<CryptService>;

  beforeEach(async () => {
    usersServiceStub = sinon.createStubInstance(UsersService);
    jwtServiceStub = sinon.createStubInstance(JwtService);
    cryptServiceStub = sinon.createStubInstance(CryptService);
    authService = new AuthService(
      jwtServiceStub,
      usersServiceStub,
      cryptServiceStub,
    );
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('authenticate', () => {
    it('should return null if the user does not exist', async () => {
      const username = 'nonexistent';
      const password = 'password123';
      usersServiceStub.findByUsername.resolves(undefined);

      const result = await authService.authenticate(username, password);
      expect(result).to.be.null;
    });

    it('should return null if the password does not match', async () => {
      const username = 'existinguser';
      const password = 'wrongpassword';
      usersServiceStub.findByUsername.resolves({
        username,
        password: 'hashedPassword',
      } as User);
      cryptServiceStub.compare.resolves(false);

      const result = await authService.authenticate(username, password);
      expect(result).to.be.null;
    });

    it('should return true if the password matches', async () => {
      const username = 'existinguser';
      const password = 'correctpassword';
      usersServiceStub.findByUsername.resolves({ username, password } as User);
      cryptServiceStub.compare.resolves(true);
      jwtServiceStub.sign.resolves('token');

      const result = await authService.authenticate(username, password);
      expect(result).to.be.deep.equal('token');
    });
  });
});
