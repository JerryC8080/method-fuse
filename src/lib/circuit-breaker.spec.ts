import test from 'ava';

import { CircuitBreaker } from './circuit-breaker';

test('fuse', (t) => {
  const fuse: CircuitBreaker = new CircuitBreaker();
  t.truthy(fuse);
});
