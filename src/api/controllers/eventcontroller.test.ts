import request from 'supertest';
import { app } from '../../app';

describe('Test PingController',  () => {
  it('Request /ping should return Pong!', async () => {
    const result = await request(app).get('/event').send();
    jest.useFakeTimers();
    jest.advanceTimersByTime(10000);
    expect(result.status).toBe(201);
  });
});