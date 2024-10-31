import React, { useState } from 'react';
import { Card, CardContent, CardActions, Button, Tooltip } from '@mui/material';
import BetModal from './BetModal';
import { useUser } from '../hooks/useUser';
import { useThemeContext } from '../hooks/useTheme';
import { Event } from '../api/interfaces/events';
import { SelectionEnum } from '../api/interfaces/bets';
import EventInfo from './EventInfo';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { user } = useUser();
  const { isDarkMode } = useThemeContext();
  const [isBetModalOpen, setIsBetModalOpen] = useState(false);
  const [selectedBet, setSelectedBet] = useState<SelectionEnum>(
    SelectionEnum.teamA,
  );

  const handlePlaceBetClick = (option: SelectionEnum) => {
    if (user) {
      setSelectedBet(option);
      setIsBetModalOpen(true);
    }
  };

  return (
    <Card
      sx={{
        minHeight: 200,
        margin: 1,
        boxShadow: 3,
      }}
    >
      <CardContent>
        <EventInfo event={event} isDarkMode={isDarkMode} />
      </CardContent>

      <CardActions
        sx={{ display: 'flex', justifyContent: 'space-around', padding: 2 }}
      >
        {user ? (
          <>
            <Button
              variant="contained"
              color="info"
              onClick={() => handlePlaceBetClick(SelectionEnum.teamA)}
              sx={{ fontSize: '0.9em', fontWeight: 'bold' }}
            >
              1 ({event.odds.teamA})
            </Button>
            <Button
              variant="contained"
              color="info"
              onClick={() => handlePlaceBetClick(SelectionEnum.draw)}
              sx={{ fontSize: '0.9em', fontWeight: 'bold' }}
            >
              X ({event.odds.draw})
            </Button>
            <Button
              variant="contained"
              color="info"
              onClick={() => handlePlaceBetClick(SelectionEnum.teamB)}
              sx={{ fontSize: '0.9em', fontWeight: 'bold' }}
            >
              2 ({event.odds.teamB})
            </Button>
          </>
        ) : (
          <Tooltip title="Please log in to place a bet">
            <span>
              <Button variant="contained" color="primary" disabled>
                Login to Bet
              </Button>
            </span>
          </Tooltip>
        )}
      </CardActions>

      <BetModal
        open={isBetModalOpen}
        onClose={() => setIsBetModalOpen(false)}
        event={event}
        selection={selectedBet}
      />
    </Card>
  );
};

export default EventCard;
