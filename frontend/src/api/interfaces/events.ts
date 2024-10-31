export interface Event {
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

export interface EventsList {
  events: Event[];
}
