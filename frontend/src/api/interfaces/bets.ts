export enum SelectionEnum {
  teamA = 'teamA',
  teamB = 'teamB',
  draw = 'draw',
}

export interface CreateBetRequest {
  eventId: number;
  stake: number;
  selection: SelectionEnum;
}

export interface Bet {
  stake: number;
  userId: number;
  eventId: number;
  selection: SelectionEnum;
  odds: number;
  createdAt: string;
  updatedAt: string;
}
