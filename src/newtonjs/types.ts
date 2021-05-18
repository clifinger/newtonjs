import {BehaviorSubject, Observable} from 'rxjs';

export interface NewtonStore<T> {
  readonly initialState: T
  readonly _state: BehaviorSubject<T>
  readonly _$state: Observable<T>
}
