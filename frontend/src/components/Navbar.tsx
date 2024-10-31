import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Typography,
  Container,
  Tooltip,
} from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LogoutIcon from '@mui/icons-material/Logout';
import { useThemeContext } from '../hooks/useTheme';
import { useUser } from '../hooks/useUser';
import LoginModal from './LoginModal';

const Navbar: React.FC = () => {
  const { toggleTheme, isDarkMode } = useThemeContext();
  const { user, logout } = useUser();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLoginModalOpen = () => {
    setIsLoginModalOpen(true);
  };

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Betting Dashboard
          </Typography>

          {user ? (
            <>
              <Typography variant="body1" sx={{ marginRight: 2 }}>
                Welcome, {user.username}!
              </Typography>
              <Tooltip title="Logout">
                <IconButton color="inherit" onClick={logout}>
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <Button
              color="inherit"
              variant="outlined"
              sx={{ marginRight: 2 }}
              onClick={handleLoginModalOpen}
            >
              Login
            </Button>
          )}

          <IconButton color="inherit" onClick={toggleTheme}>
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Toolbar>
      </Container>

      <LoginModal open={isLoginModalOpen} onClose={handleLoginModalClose} />
    </AppBar>
  );
};

export default Navbar;
