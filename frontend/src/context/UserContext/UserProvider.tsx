import React, { useState, useEffect, ReactNode } from 'react';
import { User, UserContext } from './UserContext';

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const decodedToken = JSON.parse(atob(storedToken.split('.')[1]));
      const username = decodedToken.username;

      const isExpired = Date.now() >= decodedToken.exp * 1000;
      if (!isExpired) {
        setUser({ username, token: storedToken });
      } else {
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = (token: string) => {
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const username = decodedToken.username;

      setUser({ username, token });
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('Token decoding failed:', error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
