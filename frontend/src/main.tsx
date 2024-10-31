import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ThemeContextProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeContextProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ThemeContextProvider>
  </StrictMode>,
);
