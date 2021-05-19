import {BehaviorSubject, Observable} from 'rxjs';
import {State, NewtonStore} from './types';
import {Subscription} from 'rxjs';
import {pluck} from 'rxjs/operators';


/**
 * Provide Default Methods for stores
 */
export class Store<T> implements NewtonStore<T> {
  readonly initialState: State;
  readonly _state: BehaviorSubject<T|any>;
  readonly _$state: Observable<T>;

  /**
   * Store Constructor
   * @param {Object} initialState
   */
  constructor(initialState: T) {
    this.initialState = initialState;
    this._state = new BehaviorSubject(this.initialState);
    this._$state = this._state.asObservable();
  }

  /**
   * Get state read only values
   */
  public get state() {
    return this._state.value;
  }

  /**
   * Subscribe to _$state Observable
   * @param {Function} callback
   * @return {Subscription}
   */
  public subscribe(callback:any): Subscription {
    return this._$state.subscribe((val) => callback(val));
  }

  /**
   * Subscribe to a _state value
   * @param {Function} callback
   * @param {string} key
   * @return {Subscription}
   */
  public subscribeToOneValue(callback:any, key: string): Subscription {
    if (this.initialState[key] === undefined ) {
      throw new Error(`The key "${key}" is not define in your initial state`);
    }
    const value$ = this._$state.pipe(
        pluck(key),
    );
    return value$.subscribe((val) => callback(val));
  }
}


