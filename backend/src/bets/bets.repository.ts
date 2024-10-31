import { DataSource, Repository } from 'typeorm';
import { Bet } from './entities/bet.entity';

export class BetsRepository extends Repository<Bet> {
  constructor(dataSource: DataSource) {
    super(Bet, dataSource.createEntityManager());
  }

  async createAndSave(betData: Partial<Bet>): Promise<Bet> {
    const bet = this.create(betData);
    return this.save(bet);
  }

  async findAll(): Promise<Bet[]> {
    return this.find();
  }
}
