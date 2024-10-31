import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import EventInfo from '../../src/components/EventInfo';
import { Event } from '../../src/api/interfaces/events';
import dayjs from 'dayjs';

describe('EventInfo Component', () => {
  const mockEvent: Event = {
    id: 1,
    type: 'Football',
    date: dayjs().toISOString(),
    teamA: 'Team A',
    teamB: 'Team B',
    odds: {
      teamA: 1.5,
      draw: 2.5,
      teamB: 3.5,
    },
  };

  it('renders event type and date correctly', async () => {
    const { getByText } = render(
      <EventInfo event={mockEvent} isDarkMode={false} />,
    );
    expect(getByText('Football')).toBeInTheDocument();
    expect(
      getByText(
        dayjs(mockEvent.date).tz(dayjs.tz.guess()).format('D MMM, HH:mm'),
      ),
    ).toBeInTheDocument();
  });

  it('renders team names in large size by default', () => {
    const { getByText } = render(
      <EventInfo event={mockEvent} isDarkMode={false} />,
    );
    expect(getByText('Team A')).toBeInTheDocument();
    expect(getByText('Team B')).toBeInTheDocument();
  });

  it('renders team names in small size when eventNameSize is small', () => {
    const { getByText } = render(
      <EventInfo event={mockEvent} isDarkMode={false} eventNameSize="small" />,
    );
    expect(getByText('Team A vs. Team B')).toBeInTheDocument();
  });

  it('renders sport icon based on event type and dark mode', () => {
    const { container } = render(
      <EventInfo event={mockEvent} isDarkMode={true} />,
    );
    const sportIcon = container.querySelector('svg');
    expect(sportIcon).toBeInTheDocument();
  });
});
