import dotenv from 'dotenv';

dotenv.config();

export interface Config {
  port: string;
  jwtSecret: string;
}

export const config: Config = {
  port: process.env.PORT || '3000',
  jwtSecret: process.env.JWT_SECRET || 'secret',
};
