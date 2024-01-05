import { z } from 'zod';

export interface CreateEventDTO {
  description: string;
  dayOfWeek: string;
}

export const CreateEventSchema = z.object({
  description: z
    .string()
    .min(5, { message: 'Description must be 5 or more characters long' }),
  dayOfWeek: z.enum([
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]),
});
