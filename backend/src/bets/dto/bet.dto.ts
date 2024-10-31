import { SelectionEnum } from '../../utils/types';

export interface BetDto {
  stake: number;
  userId: number;
  eventId: number;
  selection: SelectionEnum;
  odds: number;
  createdAt: string;
  updatedAt: string;
}
