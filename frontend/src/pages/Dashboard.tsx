import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid2';
import { useApi } from '../hooks/useApi';
import { Event } from '../api/interfaces/events';
import EventCard from '../components/EventCard';
import { Box, Button } from '@mui/material';
import { getSportIcon } from '../utils/getSportIcon';
import { useThemeContext } from '../hooks/useTheme';

const Dashboard = () => {
  const availableSports = ['Soccer', 'Basketball'];
  const { isLoading, getEvents } = useApi();
  const { isDarkMode } = useThemeContext();
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedSports, setSelectedSports] =
    useState<string[]>(availableSports);

  useEffect(() => {
    const loadEvents = async () => {
      const response = await getEvents();
      if (response.data?.events) {
        setEvents(response.data.events);
      }
    };

    loadEvents();
  }, []);

  const toggleSport = (sport: string) => {
    setSelectedSports((prev) =>
      prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport],
    );
  };

  const filteredEvents = events.filter((event) =>
    selectedSports.includes(event.type),
  );

  if (isLoading) return <CircularProgress />;

  return (
    <>
      <Box my={1}>
        {availableSports.map((sport) => (
          <Button
            key={sport}
            variant={selectedSports.includes(sport) ? 'contained' : 'outlined'}
            onClick={() => toggleSport(sport)}
            color="info"
            style={{ margin: '4px' }}
            startIcon={getSportIcon(sport, isDarkMode)}
            sx={{ textTransform: 'none' }}
          >
            {sport}
          </Button>
        ))}
      </Box>
      <Grid container spacing={3}>
        {filteredEvents.map((event) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={event.id}>
            <EventCard event={event} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Dashboard;
