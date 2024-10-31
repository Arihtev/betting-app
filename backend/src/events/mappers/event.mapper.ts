import { EventDto } from '../dto/event.dto';
import { Event } from '../entities/event.entity';

export class EventMapper {
  public static toDto(entity: Event): EventDto {
    return {
      id: entity.id,
      type: entity.type,
      teamA: entity.teamA,
      teamB: entity.teamB,
      date: entity.date.toISOString(),
      odds: {
        teamA: entity.oddsTeamA,
        teamB: entity.oddsTeamB,
        draw: entity.oddsDraw,
      },
    };
  }
}
