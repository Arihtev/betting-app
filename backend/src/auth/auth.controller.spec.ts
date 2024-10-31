import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { AuthenticateDTO } from './schemas/authenticate.schema';
import * as httpMocks from 'node-mocks-http';

describe('AuthController', () => {
  let authController: AuthController;
  let authServiceStub: sinon.SinonStubbedInstance<AuthService>;

  beforeEach(async () => {
    authServiceStub = sinon.createStubInstance(AuthService);
    authController = new AuthController(authServiceStub);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('authenticate', () => {
    it('should return a JWT token when authentication is successful', async () => {
      const authDto: AuthenticateDTO = { username: 'bob', password: 'bob' };
      authServiceStub.authenticate.resolves('token');

      const request = httpMocks.createRequest({
        method: 'POST',
        url: '/auth/login',
        body: authDto,
      });
      const response = httpMocks.createResponse();

      await authController.authenticate(request, response);

      expect(
        authServiceStub.authenticate.calledWith(
          authDto.username,
          authDto.password,
        ),
      ).to.be.true;
      expect(response.statusCode).to.equal(200);
      expect(response._getData()).to.equal(JSON.stringify({ token: 'token' }));
    });

    it('should return error when authentication fails', async () => {
      const authDto: AuthenticateDTO = {
        username: 'bob',
        password: 'wrong-password',
      };
      authServiceStub.authenticate.resolves(null);

      const request = httpMocks.createRequest({
        method: 'POST',
        url: '/auth/login',
        body: authDto,
      });
      const response = httpMocks.createResponse();

      await authController.authenticate(request, response);

      expect(
        authServiceStub.authenticate.calledWith(
          authDto.username,
          authDto.password,
        ),
      ).to.be.true;
      expect(response.statusCode).to.equal(401);
      expect(JSON.parse(response._getData())).to.deep.equal({
        message: 'Invalid credentials',
      });
    });
  });
});
