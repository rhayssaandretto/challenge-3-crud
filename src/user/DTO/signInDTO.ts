import { z } from 'zod';

export interface SignInDTO {
  email: string;
  password: string;
}

export const SignInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be 6 or more characters long' }),
});
