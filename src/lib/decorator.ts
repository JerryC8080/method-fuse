import { CircuitBreaker, CircuitBreakerOptions } from './circuit-breaker';

export default function concurrentMerger(options: CircuitBreakerOptions) {
  const circuitBreaker = new CircuitBreaker(options);

  return function (
    _target: Record<string, any>,
    _propertyName: string,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
  ) {
    const method = descriptor.value;
    if (method)
      // async 包一层，兼容 method 非异步函数情况
      descriptor.value = circuitBreaker.proxy(async function (
        this: any,
        ...arg
      ) {
        return method.apply(this, arg);
      });
  };
}
