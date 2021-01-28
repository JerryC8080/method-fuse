import test from 'ava';

import { MethodFuse } from './method-fuse';

test('fuse break', async (t) => {
  const fuse: MethodFuse = new MethodFuse({
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
  const fuse: MethodFuse = new MethodFuse({
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
