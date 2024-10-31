import { EventsRepository } from './events.repository';
import { EventMapper } from './mappers/event.mapper';
import { EventDto } from './dto/event.dto';

export class EventsService {
  constructor(private readonly eventsRepository: EventsRepository) {}

  async getAllEvents(): Promise<EventDto[]> {
    const events = await this.eventsRepository.findAll();

    return events.map(EventMapper.toDto);
  }

  async getEventById(id: number): Promise<EventDto | null> {
    const event = await this.eventsRepository.findOneBy({ id });

    if (!event) {
      return null;
    }

    return EventMapper.toDto(event);
  }
}
