import React from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Event } from '../api/interfaces/events';
import { Box, Typography } from '@mui/material';
import { getSportIcon } from '../utils/getSportIcon';

dayjs.extend(utc);
dayjs.extend(timezone);

interface EventInfoProps {
  event: Event;
  isDarkMode: boolean;
  eventNameSize?: 'small' | 'large';
}

const EventInfo: React.FC<EventInfoProps> = ({
  event,
  isDarkMode,
  eventNameSize = 'large',
}) => {
  const localDate = dayjs(event.date)
    .tz(dayjs.tz.guess())
    .format('D MMM, HH:mm');

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
      >
        <Box display="flex" alignItems="center">
          {getSportIcon(event.type, isDarkMode)}
          <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
            {event.type}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <AccessTimeIcon fontSize="small" />
          <Typography variant="body1" sx={{ ml: 1, textAlign: 'right' }}>
            {localDate}
          </Typography>
        </Box>
      </Box>
      {eventNameSize === 'large' ? (
        <>
          <Typography variant="h6">{event.teamA}</Typography>
          <Typography variant="h6">{event.teamB}</Typography>
        </>
      ) : (
        <>
          <Typography variant="body1">
            {event.teamA} vs. {event.teamB}
          </Typography>
        </>
      )}
    </>
  );
};

export default EventInfo;
