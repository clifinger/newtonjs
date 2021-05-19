import {BehaviorSubject, Observable} from 'rxjs';

export type State = {
  [key: string]: any
}

export interface NewtonStore<T> {
  readonly initialState: State
  readonly _state: BehaviorSubject<T>
  readonly _$state: Observable<T>
}


