import test from 'ava';

import { CircuitBreaker } from './circuit-breaker';

test('fuse break', async (t) => {
  const fuse: CircuitBreaker = new CircuitBreaker({
    name: 'fuse break',
    maxLoad: 5,
    breakingTime: 5000,
  });

  const getAssets = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, 100);
    });

  const getAssetsProxy = fuse.proxy(getAssets);

  t.notThrows(() => getAssetsProxy());
  t.notThrows(() => getAssetsProxy());
  t.notThrows(() => getAssetsProxy());
  t.notThrows(() => getAssetsProxy());
  t.notThrows(() => getAssetsProxy());
  await t.throwsAsync(() => getAssetsProxy());
  await t.throwsAsync(() => getAssetsProxy());

  await new Promise((resolve) => setTimeout(() => resolve(null), 5000));
  t.notThrows(() => getAssetsProxy());
});

test('auto freedom', async (t) => {
  const fuse: CircuitBreaker = new CircuitBreaker({
    name: 'auto freedom',
    maxLoad: 3,
    breakingTime: 1000,
  });

  const getAssets = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, 100);
    });

  const getAssetsProxy = fuse.proxy(getAssets);

  t.notThrows(() => getAssetsProxy());
  t.notThrows(() => getAssetsProxy());
  t.notThrows(() => getAssetsProxy());

  await new Promise((resolve) => setTimeout(() => resolve(null), 1000));

  t.notThrows(() => getAssetsProxy());
  t.notThrows(() => getAssetsProxy());
  t.notThrows(() => getAssetsProxy());
});
