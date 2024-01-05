import { z } from 'zod';

export interface GetEventsDTO {
  _id?: string;
  dayOfWeek?: string;
  description?: string;
  userId?: string;
}

export const GetEventsSchema = z.object({
  _id: z.string().optional(),
  dayOfWeek: z.string().optional(),
  description: z.string().optional(),
  userId: z.string().optional(),
});
