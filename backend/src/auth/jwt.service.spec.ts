import { Config } from '../utils/config';
import { JwtService } from './jwt.service';
import { expect } from 'chai';

describe('JwtService', () => {
  const config = { jwtSecret: 'secret' } as Config;
  let jwtService: JwtService;

  beforeEach(async () => {
    jwtService = new JwtService(config);
  });

  describe('sign', () => {
    it('should sign a payload correctly', () => {
      const payload = { userId: 1 };
      const token = jwtService.sign(payload);
      expect(token).to.be.a('string');
    });
  });

  describe('verify', () => {
    it('should verify a token correctly', () => {
      const payload = { userId: 1 };
      const token = jwtService.sign(payload);
      const decoded = jwtService.verify(token);
      expect(decoded).to.have.property('userId', 1);
    });

    it('should throw an error for an invalid token', () => {
      const invalidToken = 'invalid.token';
      expect(() => jwtService.verify(invalidToken)).to.throw('Invalid token');
    });
  });
});
