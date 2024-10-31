import { SelectionEnum } from '../../utils/types';
import { z } from 'zod';

export const createBetSchema = z.object({
  eventId: z.number({ message: 'Event ID is required' }),
  stake: z.number({
    message: 'Stake is required',
  }),
  selection: z.enum(
    [SelectionEnum.TeamA, SelectionEnum.TeamB, SelectionEnum.Draw],
    {
      message: 'Invalid selection',
    },
  ),
});

export type CreateBetDTO = z.infer<typeof createBetSchema>;
