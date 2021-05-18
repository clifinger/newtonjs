import {BehaviorSubject, Observable} from 'rxjs';
import {NewtonStore} from './types';
import {Subscription} from 'rxjs';

/**
 * Provide Default Methods for stores
 */
export class Store<T> implements NewtonStore<T> {
  readonly initialState: T;
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
   * Subscribe to _state subject
   * @param {Function} callback
   * @return {Subscription}
   */
  public subscribe(callback:any): Subscription {
    return this._state.subscribe(callback);
  }
}


