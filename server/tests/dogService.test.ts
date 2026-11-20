import { afterEach, expect, test, vi } from 'vitest';
import { getRandomDogImage } from '../services/dogService';

afterEach(() => {
  vi.unstubAllGlobals();
});

test('Returns a dog image when the API call succeeds', async () => {
  const fetchMock = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      message: 'https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg',
      status: 'success'
    })
  });
  vi.stubGlobal('fetch', fetchMock);

  const result = await getRandomDogImage();

  expect(result).toEqual({
    imageUrl: 'https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg',
    status: 'success'
  });
  expect(fetchMock).toHaveBeenCalledOnce();
});

test('Throws an error when the API returns status 500', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok: false,
    status: 500
  }));

  await expect(getRandomDogImage()).rejects.toThrow(
    'Failed to fetch dog image: Dog API returned status 500'
  );
});
