import { z } from 'zod';

export interface CreateUserDTO {
  firstName: string;
  lastName: string;
  birthDate: Date;
  city: string;
  country: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const CreateUserSchema = z.object({
  firstName: z.string().regex(/^[a-zA-Z]+$/),
  lastName: z.string().regex(/^[a-zA-Z]+$/),
  birthDate: z.date(),
  city: z.string().regex(/^[a-zA-Z]+$/),
  country: z.string().regex(/^[a-zA-Z]+$/),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string(),
});
