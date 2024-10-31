import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import EventCard from '../../src/components/EventCard';
import { useUser } from '../../src/hooks/useUser';
import { useThemeContext } from '../../src/hooks/useTheme';
import { Event } from '../../src/api/interfaces/events';
import dayjs from 'dayjs';

vi.mock('../../src/hooks/useUser');
vi.mock('../../src/hooks/useTheme');

describe('EventCard', () => {
  const mockEvent: Event = {
    id: 1,
    type: 'Football',
    teamA: 'Team A',
    teamB: 'Team B',
    date: dayjs().toISOString(),
    odds: {
      teamA: 1.5,
      draw: 3.2,
      teamB: 2.8,
    },
  };
  it('renders event information', () => {
    (useUser as Mock).mockReturnValue({
      user: { username: 'test', token: 'asdf' },
    });
    (useThemeContext as Mock).mockReturnValue({ isDarkMode: false });

    render(<EventCard event={mockEvent} />);

    expect(screen.getByText('Team A')).toBeInTheDocument();
    expect(screen.getByText('Team B')).toBeInTheDocument();
    expect(screen.getByText('1 (1.5)')).toBeInTheDocument();
    expect(screen.getByText('X (3.2)')).toBeInTheDocument();
    expect(screen.getByText('2 (2.8)')).toBeInTheDocument();
  });

  it('shows login prompt on betting buttons, hides odds', () => {
    (useUser as Mock).mockReturnValue({ user: null });
    (useThemeContext as Mock).mockReturnValue({ isDarkMode: false });

    render(<EventCard event={mockEvent} />);

    expect(screen.getByText('Login to Bet')).toBeInTheDocument();
    expect(screen.queryByText('1 (1.5)')).not.toBeInTheDocument();
  });

  it('opens bet modal when user clicks on a bet option', () => {
    (useUser as Mock).mockReturnValue({
      user: { name: 'test' },
    });
    (useThemeContext as Mock).mockReturnValue({ isDarkMode: false });

    render(<EventCard event={mockEvent} />);

    fireEvent.click(screen.getByText('1 (1.5)'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
