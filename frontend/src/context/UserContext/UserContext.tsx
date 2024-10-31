import { createContext } from 'react';

export interface User {
  username: string;
  token: string;
}

export interface UserContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);
