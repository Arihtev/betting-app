import * as jwt from 'jsonwebtoken';
import { Config } from '../utils/config';

export class JwtService {
  private readonly secret: string;
  private readonly expiresIn = '1d';

  constructor(config: Config) {
    this.secret = config.jwtSecret;
  }

  sign(payload: object): string {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
  }

  verify(token: string): object | string {
    try {
      return jwt.verify(token, this.secret);
    } catch (error) {
      console.error(`Invalid token: ${error}`);
      throw new Error('Invalid token');
    }
  }
}
