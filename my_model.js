/**
 *  MobX 6.x doesn't support decorate anymore!!!
 *  @see https://github.com/mobxjs/mobx/issues/2325
 *  the use of makeObservable method in the model class constructor has issues
 *  therefore it's the best to use makeAutoObservable.
 *
 *  for TypeScript there is a solution to use inline decorators
 *  (instead of an explicitfunction)
 * @see https://github.com/tc39/proposal-decorators
 */

import {
  observable,
  action,
  computed,
  makeObservable,
  makeAutoObservable,
  configure,
} from 'mobx';

configure({
  useProxies: 'never',
});

/**
 * create a mobx observable
 * better use private members with getters and setters...
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields
 */
export class Counter {
  #count;

  get value() {
    return this.count;
  }

  set value(val) {
    this.count = val;
  }

  get isMoreThan10() {
    return this.value > 10;
  }

  doDouble() {
    this.count *= 2;
  }

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }

  setToZero() {
    this.count = 0;
  }

  constructor() {
    this.setToZero();
    makeAutoObservable(this);
  }
}
