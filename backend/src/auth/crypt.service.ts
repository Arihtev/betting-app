import * as bcrypt from 'bcrypt';

export class CryptService {
  private readonly saltRounds = 10;

  async compare(data: string, encrypted: string): Promise<boolean> {
    return bcrypt.compare(data, encrypted);
  }

  async hash(data: string): Promise<string> {
    return bcrypt.hash(data, this.saltRounds);
  }
}
