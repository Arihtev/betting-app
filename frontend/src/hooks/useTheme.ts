import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext/ThemeContext';

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      'useThemeContext must be used within a ThemeContextProvider',
    );
  }
  return context;
};
