import express from 'express';
import request from 'supertest';
import { afterEach, expect, test, vi } from 'vitest';
import { getDogImage } from '../controllers/dogController';
import dogRoutes from '../routes/dogRoutes';

vi.mock('../controllers/dogController');

const app = express();
app.use('/api/dogs', dogRoutes);

afterEach(() => {
  vi.resetAllMocks();
});

test('GET /api/dogs/random returns a dog image and status 200', async () => {
  const responseData = {
    success: true,
    data: {
      imageUrl: 'https://images.dog.ceo/breeds/stbernard/n02109525_15579.jpg',
      status: 'success'
    }
  };
  vi.mocked(getDogImage).mockImplementation(async (_req, res) => {
    res.status(200).json(responseData);
  });

  const res = await request(app).get('/api/dogs/random');

  expect(res.status).toBe(200);
  expect(res.body).toEqual(responseData);
});

test('GET /api/dogs/random returns an error and status 500', async () => {
  vi.mocked(getDogImage).mockImplementation(async (_req, res) => {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dog image: Network error'
    });
  });

  const res = await request(app).get('/api/dogs/random');

  expect(res.status).toBe(500);
  expect(res.body).toEqual({
    success: false,
    error: 'Failed to fetch dog image: Network error'
  });
});
