import { EventsService } from './events.service';
import { Request, Response } from 'express';
import { EventDto } from './dto/event.dto';

export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  getAllEvents = async (req: Request, res: Response) => {
    try {
      const events: EventDto[] = await this.eventsService.getAllEvents();

      res.status(200).json({ events });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to retrieve events' });
    }
  };
}
