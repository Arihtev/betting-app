import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';

export class UsersRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.findOne({ where: { username }, relations: [] });
  }
}
