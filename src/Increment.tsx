import React from 'react';
import './App.css';
import {
  useNewtonAsyncValue,
  useNewtonState,
  useNewtonValue,
} from './newtonjs/hooks';
import {counterStore} from './store';
import {State} from './newtonjs/types';

const incrementAction = () => counterStore.incrementAction();
const decrementAction = () => counterStore.decrementAction();
const usersAction = () => counterStore.userRequestAction();

/**
 * Main App
 * @constructor
 */
function Increment() {
  const counter: State = useNewtonState(counterStore);
  const count: number = useNewtonValue(counterStore, 'count');
  const [
    users,
    loading,
    error,
    cancel,
  ] = useNewtonAsyncValue(counterStore, 'users');

  const cancelRequestUsers = () => {
    cancel?.next(true);
    cancel?.unsubscribe();
  };

  return (
    <>
      <button onClick={incrementAction}>
            +
      </button>
      <button onClick={decrementAction}>
            -
      </button>
      <p>Value in children: {counter.count}</p>
      <p>Count newtonValue (single value): {count}</p>

      <button onClick={usersAction} disabled={loading}>
        Get users
      </button>
      <button onClick={cancelRequestUsers} disabled={!loading}>
        Stop getting users
      </button>
      <p>Users:</p>
      {loading && (<p>Loading ...</p>)}
      { error && (<span>{error.message}</span>)}
      <ul>
        {loading === false && users?.data?.map((user: any) => (
          <li key={user.id}>{user.first_name}</li>
        ))}
      </ul>
    </>
  );
}

export default React.memo(Increment);
