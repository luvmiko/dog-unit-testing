import type { Request, Response } from 'express';
import { afterEach, expect, test, vi } from 'vitest';
import { getDogImage } from '../controllers/dogController';
import * as dogService from '../services/dogService';

afterEach(() => {
  vi.restoreAllMocks();
});

test('Returns success and the dog image from the service', async () => {
  const dogData = {
    imageUrl: 'https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg',
    status: 'success'
  };
  vi.spyOn(dogService, 'getRandomDogImage').mockResolvedValue(dogData);
  const req = {} as Request;
  const res: Partial<Response> = {
    json: vi.fn()
  };

  await getDogImage(req, res as Response);

  expect(res.json).toHaveBeenCalledWith({
    success: true,
    data: dogData
  });
});
