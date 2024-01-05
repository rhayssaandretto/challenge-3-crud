import { GetEventsSchema } from '../src/event/DTO';

describe('Event Validation', () => {
  it('should validate a valid event search input', () => {
    const validInput = {
      dayOfWeek: 'Monday',
      description: 'Example Event',
    };

    expect(() => GetEventsSchema.parse(validInput)).not.toThrow();
  });
});
