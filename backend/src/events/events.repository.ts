import { DataSource, Repository } from 'typeorm';
import { Event } from './entities/event.entity';

export class EventsRepository extends Repository<Event> {
  constructor(dataSource: DataSource) {
    super(Event, dataSource.createEntityManager());
  }
  async findAll(): Promise<Event[]> {
    return this.find();
  }
}
