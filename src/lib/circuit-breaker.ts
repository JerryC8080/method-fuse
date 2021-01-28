import { Logger } from '@jerryc/mini-logger';

export const logger = new Logger({ prefix: 'circuit-breaker' });

export interface CircuitBreakerOptions {
  name?: string;
  maxLoad?: number;
  breakingTime?: number;
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

  // 自动冷却时间，单位 ms
  private coolDownTime = 1000;

  private resetTimer = null;

  constructor(params: CircuitBreakerOptions = {}) {
    if (params.name) this.name = params.name;
    if (params.maxLoad) this.maxLoad = params.maxLoad;
    if (params.breakingTime) this.breakingTime = params.breakingTime;
    if (params.coolDownTime) this.coolDownTime = params.coolDownTime;
  }

  public reset() {
    this.breaked = false;
    this.curLoad = 0;
    logger.info(`${this.name}-保险丝重置`);
  }

  public resetAfter(ms) {
    if (this.resetTimer) clearTimeout(this.resetTimer);
    this.resetTimer = setTimeout(() => this.reset(), ms);
  }

  public proxy(originMethod: (...any) => Promise<any>) {
    const that = this;

    return async function (this: any, ...args) {
      if (that.breaked) {
        const message = `${that.name}-保险丝已熔断，请稍后重试`;
        logger.error(message);
        throw new Error(message);
      }

      // 已达最大重试次数
      if (that.curLoad >= that.maxLoad) {
        that.breaked = true;

        // 重置保险丝
        that.resetAfter(that.breakingTime);

        const message = `${that.name}-保险丝熔断，${that.breakingTime}ms 之后重铸`;
        logger.error(message);
        throw new Error(message);
      }

      // 自动冷却系统
      that.resetAfter(that.coolDownTime);

      // 允许当前请求通过保险丝，记录 +1
      that.curLoad = that.curLoad + 1;
      logger.info(`${that.name}-通过保险丝(${that.curLoad}/${that.maxLoad})`);

      return originMethod.apply(this, ...args);
    };
  }
}
