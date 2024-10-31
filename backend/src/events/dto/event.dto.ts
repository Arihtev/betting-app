export interface EventDto {
  id: number;
  type: string;
  teamA: string;
  teamB: string;
  date: string;
  odds: {
    teamA: number;
    teamB: number;
    draw: number;
  };
}
