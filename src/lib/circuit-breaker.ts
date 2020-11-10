import { Logger } from '@retailwe/common-libs-logger';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const logger: any = new Logger({ prefix: 'fuse' });

export interface CircuitBreakerOptions {
  name?: string;
  maxLoad?: number;
  fusingTime?: number;
  coolDownTime?: number;
}

export class CircuitBreaker {
  // 保险丝名称
  private name = 'unnamed';

  // 最大负荷量，单位：调用次数
  private maxLoad = 3;

  // 当前负荷量，单位：调用次数
  private curLoad = 0;

  // 熔断持续时间，单位 ms
  private breakingTime = 5000;

  // 熔断状态
  private breaked = false;

  // 冷却时间，单位 ms
  private coolDownTime = 1000;

  constructor(params: CircuitBreakerOptions = {}) {
    if (params.name) this.name = params.name;
    if (params.maxLoad) this.maxLoad = params.maxLoad;
    if (params.fusingTime) this.breakingTime = params.fusingTime;
    if (params.coolDownTime) this.coolDownTime = params.coolDownTime;
  }

  reset() {
    this.breaked = false;
    this.curLoad = 0;
    logger.info(`${this.name}-保险丝重置`);
  }
}
