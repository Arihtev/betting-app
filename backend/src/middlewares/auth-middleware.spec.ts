import { expect } from 'chai';
import * as sinon from 'sinon';
import { authMiddleware } from './auth-middleware';
import { JwtService } from '../auth/jwt.service';
import * as httpMocks from 'node-mocks-http';

describe('authMiddleware', () => {
  let jwtServiceStub: sinon.SinonStubbedInstance<JwtService>;
  let next: sinon.SinonStub;

  beforeEach(() => {
    jwtServiceStub = sinon.createStubInstance(JwtService);
    next = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should return 401 if authorization header is missing', () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    authMiddleware(jwtServiceStub)(req, res, next);

    expect(res.statusCode).to.equal(401);
    expect(res._getJSONData()).to.deep.equal({
      message: 'Authorization header is missing',
    });
    expect(next.called).to.be.false;
  });

  it('should return 401 if token is missing in authorization header', () => {
    const req = httpMocks.createRequest({
      headers: { authorization: 'Bearer ' },
    });
    const res = httpMocks.createResponse();

    authMiddleware(jwtServiceStub)(req, res, next);

    expect(res.statusCode).to.equal(401);
    expect(res._getJSONData()).to.deep.equal({ message: 'Token is missing' });
    expect(next.called).to.be.false;
  });

  it('should return 401 if token is invalid', () => {
    const req = httpMocks.createRequest({
      headers: { authorization: 'Bearer invalidtoken' },
    });
    const res = httpMocks.createResponse();

    jwtServiceStub.verify.throws(new Error('Invalid token'));

    authMiddleware(jwtServiceStub)(req, res, next);

    expect(res.statusCode).to.equal(401);
    expect(res._getJSONData()).to.deep.equal({ message: 'Invalid token' });
    expect(next.called).to.be.false;
  });

  it('should call next if token is valid', () => {
    const decodedToken = { id: 1, username: 'bob' };
    const req = httpMocks.createRequest({
      headers: { authorization: 'Bearer validtoken' },
    });
    const res = httpMocks.createResponse();

    jwtServiceStub.verify.returns(decodedToken);

    authMiddleware(jwtServiceStub)(req, res, next);

    expect(res.locals.user).to.deep.equal(decodedToken);
    expect(next.calledOnce).to.be.true;
  });
});
