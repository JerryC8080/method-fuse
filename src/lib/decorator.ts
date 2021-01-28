import { MethodFuse, MethodFuseOptions } from './method-fuse';

export default function concurrentMerger(options: MethodFuseOptions) {
  const methodFuse = new MethodFuse(options);

  return function (
    _target: Record<string, any>,
    _propertyName: string,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
  ) {
    const method = descriptor.value;
    if (method)
      // async 包一层，兼容 method 非异步函数情况
      descriptor.value = methodFuse.proxy(async function (this: any, ...arg) {
        return method.apply(this, arg);
      });
  };
}
