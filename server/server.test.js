import request from 'supertest';
import createServer from './server.js';

let app, sequelize;

beforeAll(async () => {
  const server = await createServer();
  app = server.app;
  sequelize = server.sequelize;
});

afterAll(async () => {
  await sequelize.close();
});

describe('GET /api/hello', () => {
  it('should return a 200 OK status code', async () => {
    const response = await request(app).get('/api/hello');
    expect(response.statusCode).toBe(200);
  });

  it('should return a JSON object with a "message" property', async () => {
    const response = await request(app).get('/api/hello');
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Hello from GolfLab server!');
  });
});
