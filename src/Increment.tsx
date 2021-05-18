import React from 'react';
import './App.css';
import {useNewtonState, useNewtonValue} from './newtonjs/hooks';
import {counterStore} from './store';

const incrementAction = () => counterStore.incrementAction();
const decrementAction = () => counterStore.decrementAction();

/**
 * Main App
 * @constructor
 */
function Increment() {
  const counter = useNewtonState(counterStore);
  const count = useNewtonValue(counterStore, 'count');
  return (
    <>
      <button onClick={incrementAction}>
            +
      </button>
      <button onClick={decrementAction}>
            -
      </button>
      <p>Value in children: {counter.count}</p>
      <p>Count Reactive {count}</p>
    </>
  );
}

export default React.memo(Increment);
