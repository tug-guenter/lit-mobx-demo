import { globalCounter } from './my_data';
//import { LitElement, html, TemplateResult } from 'lit-element';
import { html } from 'lit';
import { MobxLitElement } from '@adobe/lit-mobx';
import { Counter } from './my_model';

// create a new custom element, and use the base MobxLitElement class
// alternatively you can use the MobxReactionUpdate mixin, e.g. `class MyElement extends MobxReactionUpdate(LitElement)`
class MyElement extends MobxLitElement {
  static get properties() {
    return {
      name: { type: String },
      // usage of class Counter might not be standard
      counter: { type: Counter, attribute: false },
    };
  }

  // any observables accessed in the render method will now trigger an update
  render() {
    return html`
            <h1>Hello ${this.name}!</h1>
            Count is ${this.counter.count}
            <br />
            <button @click=${this.setZeroCount}>Set to Zero (0)</button>
            <button @click=${this.decrementCount}>Sub(-)</button>
            <button @click=${this.incrementCount}>Add(+)</button>
            <button @click=${this.doubleCount}>Double(x2)</button>
            <br/>
            Is more than 10: ${this.counter.isMoreThan10}
        `;
  }

  constructor() {
    super();
    // create instance that can be shared across components
    this.counter = globalCounter;
    this.isMoreThan10 = this.counter.counterMoreThan10;
    this.name = '';
  }

  firstUpdated() {
    // you can update in first updated
    this.counter.increment(); // value is now 1
  }

  decrementCount() {
    // and you can trigger change in event callbacks
    this.counter.decrement(); // value is now n - 1
  }
  incrementCount() {
    // and you can trigger change in event callbacks
    this.counter.increment(); // value is now n + 1
  }

  doubleCount() {
    // and you can trigger change in event callbacks
    this.counter.doDouble(); // value is now n * 2
  }

  setZeroCount() {
    // and you can trigger change in event callbacks
    this.counter.setToZero(); // value is now 0
  }
}

customElements.define('my-element', MyElement);
