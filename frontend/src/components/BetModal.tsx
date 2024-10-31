import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Snackbar,
  Alert,
} from '@mui/material';
import { Event } from '../api/interfaces/events';
import { SelectionEnum } from '../api/interfaces/bets';
import { useApi } from '../hooks/useApi';
import { useThemeContext } from '../hooks/useTheme';
import EventInfo from './EventInfo';

interface BetModalProps {
  open: boolean;
  onClose: () => void;
  event: Event;
  selection: SelectionEnum;
}

const BetModal: React.FC<BetModalProps> = ({
  open,
  onClose,
  event,
  selection,
}) => {
  const { isDarkMode } = useThemeContext();
  const { isLoading, createBet } = useApi();
  const [stake, setStake] = useState(10);
  const [betSuccess, setBetSuccess] = useState(false);

  useEffect(() => {
    if (open) {
      setStake(10);
      setBetSuccess(false);
    }
  }, [open]);

  const selectionName =
    selection === SelectionEnum.teamA
      ? event.teamA
      : selection === SelectionEnum.teamB
        ? event.teamB
        : 'Draw';

  const selectionOdds = event.odds[selection];

  const potentialWin = (stake * selectionOdds).toFixed(2);

  const handlePlaceBet = async () => {
    if (!stake) return;
    const response = await createBet({
      eventId: event.id,
      selection,
      stake,
    });

    if (response.data) {
      setBetSuccess(true);
      onClose();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStake(Number(e.target.value));
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handlePlaceBet();
    }
  };

  return (
    <>
      {' '}
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          style: {
            minWidth: '300px',
          },
        }}
      >
        <DialogTitle sx={{ textAlign: 'center' }}>
          <EventInfo
            event={event}
            isDarkMode={isDarkMode}
            eventNameSize="small"
          />
        </DialogTitle>
        <DialogContent onKeyUp={handleKeyPress}>
          <Box alignItems="baseline" justifyContent="center">
            <Box>
              <Typography
                variant="h6"
                align="center"
              >{`Bet on ${selectionName}`}</Typography>
            </Box>
            <Box display="flex" alignItems="baseline" justifyContent="center">
              <Typography variant="body1" color="textSecondary" align="center">
                Odds:
              </Typography>
              <Typography variant="h5" align="center" ml={1}>
                {selectionOdds}
              </Typography>
            </Box>
          </Box>

          <TextField
            label="Bet Amount"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={stake}
            onChange={handleInputChange}
            onKeyDown={(event) => {
              if (event?.key === '-' || event?.key === '+') {
                event.preventDefault();
              }
            }}
          />
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePlaceBet}
            disabled={isLoading || !stake}
            sx={{ textTransform: 'none', mb: 2 }}
          >
            {isLoading ? (
              <CircularProgress size={24} />
            ) : (
              `Place Bet (Wins ${potentialWin})`
            )}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={betSuccess}
        autoHideDuration={3000}
        onClose={() => setBetSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setBetSuccess(false)}
          severity="success"
          sx={{ width: '100%' }}
          variant="filled"
        >
          Bet placed successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default BetModal;
