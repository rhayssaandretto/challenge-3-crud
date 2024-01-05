import request from 'supertest';
import server from '../src/server';

describe('Testing server', () => {
  it('Should respond "Connected successfully!"', async () => {
    const response = await request(server).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Connected successfully!');
  });
});
