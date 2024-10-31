import { BetDto } from '../dto/bet.dto';
import { Bet } from '../entities/bet.entity';

export class BetMapper {
  public static toDto(entity: Bet): BetDto {
    return {
      stake: entity.stake,
      userId: entity.userId,
      eventId: entity.eventId,
      selection: entity.selection,
      odds: entity.odds,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    };
  }

  public static toEntity(dto: BetDto): Bet {
    const entity = new Bet({
      stake: dto.stake,
      userId: dto.userId,
      eventId: dto.eventId,
      selection: dto.selection,
      odds: dto.odds,
    });
    return entity;
  }
}
