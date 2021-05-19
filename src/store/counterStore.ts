import {Store} from '../newtonjs';
import {ajax} from 'rxjs/ajax';
import {Subject, Observable, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

interface CounterState {
  count: number
}

interface StoreModel {
  incrementAction: Function,
  decrementAction: Function
}

export const initialSate = {
  count: 0,
  users: {},
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
  public incrementAction(): void {
    this._state.next({
      ...this.state,
      count: this.state.count +1,
    });
  }

  /**
   * Decrement count
   */
  public decrementAction(): void {
    if (this.state.count ===0) return;
    this._state.next({
      ...this.state,
      count: this.state.count -1,
    });
  }

  /**
   * Request all users
   * @return {Subscription} obs$
   */
  public userRequestAction(): Subscription {
    const $destroy = new Subject<boolean>();
    const obs$ = ajax.getJSON(`https://reqres.in/api/users?delay=3`);
    this._state.next({
      ...this.state,
      users: {
        ...this.state.users,
        values: undefined,
        error: false,
        loading: true,
        $destroy,
      },
    });
    return obs$.pipe(takeUntil(this.state.users.$destroy)).subscribe({
      next: (v) => {
        this._state.next({
          ...this.state,
          users: {
            ...this.state.users,
            values: v,
            error: false,
            loading: true,
            $destroy},
        });
      },
      error: (e) => {
        this._state.next({
          ...this.state,
          users: {
            ...this.state.users,
            values: this.state.users.values,
            error: e,
            loading: false,
            $destroy,
          },
        });
      },
      complete: () => {
        this._state.next({
          ...this.state,
          users: {
            ...this.state.users,
            values: this.state.users.values,
            error: this.state.users.error,
            loading: false,
            $destroy,
          },
        });
      },
    },
    );
  }
}
