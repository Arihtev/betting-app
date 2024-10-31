import { z } from 'zod';

export const authenticateSchema = z.object({
  username: z.string({ message: 'Username is required' }),
  password: z.string({ message: 'Password is required' }),
});

export type AuthenticateDTO = z.infer<typeof authenticateSchema>;
