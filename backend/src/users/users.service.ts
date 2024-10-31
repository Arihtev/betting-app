import { UsersRepository } from './users.repository';

export class UsersService {
  constructor(private readonly repo: UsersRepository) {}
  async findByUsername(username: string) {
    return this.repo.findByUsername(username);
  }
}
