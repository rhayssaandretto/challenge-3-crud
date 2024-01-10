import { isValid, parseISO } from 'date-fns';
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
  firstName: z
    .string()
    .min(5, { message: 'Must be 5 or more characters long' }),
  lastName: z.string().min(5, { message: 'Must be 5 or more characters long' }),
  birthDate: z
    .string()
    .refine(
      (value) => {
        const parsedDate = parseISO(value);

        return isValid(parsedDate);
      },
      {
        message: 'Invalid date format (YYYY-MM-DD)',
      },
    )
    .transform((value) => parseISO(value)),
  city: z.string(),
  country: z.string(),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Must be 6 or more characters long' }),
  confirmPassword: z.string(),
});
