# circuit-breaker

[![CircleCI](https://circleci.com/gh/JerryC8080/circuit-breaker/tree/master.svg?style=svg)](https://circleci.com/gh/JerryC8080/circuit-breaker/tree/master)

[![NPM Version](https://img.shields.io/npm/v/@jerryc/circuit-breaker.svg)](https://www.npmjs.com/package/@jerryc/circuit-breaker) [![NPM Downloads](https://img.shields.io/npm/dm/@jerryc/circuit-breaker.svg)](https://www.npmjs.com/package/@jerryc/circuit-breaker) [![Coverage Status](https://coveralls.io/repos/github/JerryC8080/circuit-breaker/badge.svg?branch=master)](https://coveralls.io/github/JerryC8080/circuit-breaker?branch=master) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@jerryc/circuit-breaker.svg)

A little pattern that to protect your function on called to often.
I call it the circuit-breaker !

# Feature

# Usage

1. Install

   ```
   $ npm install @jerryc/circuit-breaker
   ```

2. Import

   ```javascript
   import { CircuitBreaker } from '@jerryc/circuit-breaker';
   const breaker = new CircuitBreaker();
   ```
