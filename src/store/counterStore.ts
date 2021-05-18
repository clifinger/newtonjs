import {Store} from '../newtonjs';

interface CounterState {
  count: number
}

interface StoreModel {
  incrementAction: Function,
  decrementAction: Function
}

export const initialSate = {
  count: 0,
};

/**
 * Store for counter
 */
export class CounterStoreModel extends Store<any> implements StoreModel {
  /**
   * CounterStore Constructor
   * @param {CounterState} initialSate
   */
  constructor(initialSate: CounterState) {
    super(initialSate);
  }

  /**
   * Increment count
   */
  public incrementAction() {
    this._state.next({
      ...this.state,
      count: this.state.count +1,
    });
  }

  /**
   * Decrement count
   */
  public decrementAction() {
    if (this._state.value.count ===0) return;
    this._state.next({
      ...this.state,
      count: this.state.count -1,
    });
  }
}
