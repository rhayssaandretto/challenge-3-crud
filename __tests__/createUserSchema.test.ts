import { CreateUserSchema, SignInSchema } from '../src/user/DTO';

describe('User Validation', () => {
  describe('CreateUserSchema', () => {
    it('should validate a valid user creation input', () => {
      const validInput = {
        firstName: 'Johnn',
        lastName: 'DoeDoe',
        birthDate: '1990-01-01',
        city: 'Example City',
        country: 'Example Country',
        email: 'john.doe@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      };

      expect(() => CreateUserSchema.parse(validInput)).not.toThrow();
    });

    it('should throw an error for an invalid user creation input', () => {
      const invalidInput = {
        firstName: 'Jo',
        lastName: 'Doe',
        birthDate: '1990-01-01',
        city: 'Example City',
        country: 'Example Country',
        email: 'john.doe_example.com',
        password: 'pas',
        confirmPassword: 'pas',
      };

      expect(() => CreateUserSchema.parse(invalidInput)).toThrow();
    });
  });

  describe('SignInSchema', () => {
    it('should validate a valid user sign-in input', () => {
      const validInput = {
        firstName: 'Johnn',
        lastName: 'DoeDoe',
        birthDate: '1990-01-01',
        city: 'Example City',
        country: 'Example Country',
        email: 'john.doe@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      };

      expect(() => SignInSchema.parse(validInput)).not.toThrow();
    });

    it('should throw an error for an invalid user sign-in input', () => {
      const invalidInput = {
        firstName: 'Jo',
        lastName: 'Doe',
        birthDate: '1990-01-01',
        city: 'Example City',
        country: 'Example Country',
        email: 'john.doe_example.com',
        password: 'pas',
        confirmPassword: 'pas',
      };

      expect(() => SignInSchema.parse(invalidInput)).toThrow();
    });
  });
});
