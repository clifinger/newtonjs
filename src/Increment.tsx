import React from 'react';
import './App.css';
import {useStore} from './newtonjs/useStore';
import {counterStore} from './store';

const incrementAction = () => counterStore.incrementAction();
const decrementAction = () => counterStore.decrementAction();

/**
 * Main App
 * @constructor
 */
function Increment() {
  const [counter] = useStore(counterStore);
  return (
    <>
      <button onClick={incrementAction}>
            +
      </button>
      <button onClick={decrementAction}>
            -
      </button>
      <p>Value in children: {counter.count}</p>
    </>
  );
}

export default React.memo(Increment);
