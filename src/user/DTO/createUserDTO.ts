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

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const parseAndValidateDate = (value: unknown) => {
  if (typeof value === 'string' && dateRegex.test(value)) {
    return new Date(value);
  }
  throw new Error('Invalid date format');
};

const DateStringType = z.string().refine(parseAndValidateDate, {
  message: 'Invalid date format',
});

export const CreateUserSchema = z.object({
  firstName: z
    .string()
    .min(5, { message: 'Must be 5 or more characters long' }),
  lastName: z.string().min(5, { message: 'Must be 5 or more characters long' }),
  birthDate: DateStringType,
  city: z.string(),
  country: z.string(),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Must be 6 or more characters long' }),
  confirmPassword: z.string(),
});
