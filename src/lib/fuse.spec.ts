import test from 'ava';

import { Fuse } from './fuse';

test('fuse', (t) => {
  const fuse: Fuse = new Fuse();
  t.truthy(fuse);
});
