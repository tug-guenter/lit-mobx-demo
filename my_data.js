import { Counter } from './my_model';

// this object should be observable and can be used in LitElements (the best would be to integrate this in the constructor and maybe use an optional "readonly" parameter for it)
export const globalCounter = new Counter();
