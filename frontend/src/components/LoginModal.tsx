import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { useApi } from '../hooks/useApi';
import { AxiosError } from 'axios';
import { useUser } from '../hooks/useUser';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
  const { login } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const { authenticate } = useApi();

  useEffect(() => {
    if (open) {
      setUsername('');
      setPassword('');
      setUsernameTouched(false);
      setPasswordTouched(false);
      setErrorMessage('');
    }
  }, [open]);

  const handleLogin = async () => {
    const response = await authenticate({ username, password });
    if (response.error) {
      if (
        response.error instanceof AxiosError &&
        response.error.response?.status === 401
      ) {
        setErrorMessage('Invalid username or password. Please try again.');
      } else {
        setErrorMessage(
          'An unexpected error occurred. Please try again later.',
        );
      }
    }
    if (response.data?.token) {
      login(response.data.token);
      onClose();
    }
  };

  const isLoginDisabled = !username || !password;

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleLogin();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent onKeyUp={handleKeyPress}>
        <TextField
          margin="dense"
          label="Username"
          type="text"
          fullWidth
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={() => !usernameTouched && setUsernameTouched(true)}
          error={usernameTouched && !username}
          helperText={
            usernameTouched && !username ? 'Username is required' : ''
          }
        />
        <TextField
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => !passwordTouched && setPasswordTouched(true)}
          error={passwordTouched && !password}
          helperText={
            passwordTouched && !password ? 'Password is required' : ''
          }
        />
      </DialogContent>
      {errorMessage && (
        <DialogContent sx={{ pt: 0, textAlign: 'center' }}>
          {errorMessage}
        </DialogContent>
      )}
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleLogin}
          color="primary"
          disabled={isLoginDisabled}
        >
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginModal;
