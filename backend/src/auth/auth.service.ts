import { UsersService } from '../users/users.service';
import { CryptService } from './crypt.service';
import { JwtService } from './jwt.service';

export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly cryptService: CryptService,
  ) {}

  async authenticate(
    username: string,
    password: string,
  ): Promise<string | null> {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      return null;
    }
    const passwordMatches = await this.cryptService.compare(
      password,
      user.password,
    );

    if (!passwordMatches) {
      return null;
    }
    return this.jwtService.sign({ username });
  }
}
