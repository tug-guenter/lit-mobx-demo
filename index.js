// see https://stackblitz.com/edit/lit-mobx-typescript for a TypeScript variant of thie demo

//import { LitElement, html, TemplateResult } from 'lit-element';
import { html } from 'lit';
import { observable, action, decorate } from 'mobx';
import { MobxLitElement } from '@adobe/lit-mobx';

// create a mobx observable
class Counter {
  count = 0;

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
}

/**
 *  TODO: refactor!
 *  MobX 6.x doesn't support decorate anymore!!!
 *  */
decorate(Counter, {
  count: observable,
  decrement: action,
  increment: action,
});

// create a new custom element, and use the base MobxLitElement class
// alternatively you can use the MobxReactionUpdate mixin, e.g. `class MyElement extends MobxReactionUpdate(LitElement)`
class MyElement extends MobxLitElement {
  static get properties() {
    return {
      counter: { type: Counter },
    };
  }

  // any observables accessed in the render method will now trigger an update
  render() {
    return html`
            Count is ${this.counter?.count}
            <br />
            <button @click=${this.decrementCount}>Sub(-)</button>
            <button @click=${this.incrementCount}>Add(+)</button>
        `;
  }

  firstUpdated() {
    // create instance that can be shared across components
    this.counter = new Counter();
    // you can update in first updated
    this.counter.increment(); // value is now 1
  }

  incrementCount() {
    // and you can trigger change in event callbacks
    this.counter.increment(); // value is now n + 1
  }

  decrementCount() {
    // and you can trigger change in event callbacks
    this.counter.decrement(); // value is now n - 1
  }
}

customElements.define('my-element', MyElement);
