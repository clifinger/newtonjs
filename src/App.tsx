import React from 'react';

import './App.css';
import Increment from './Increment';
import {useNewtonState} from './newtonjs/hooks';
import {counterStore} from './store';

/**
 * Main App
 * @constructor
 */
function App() {
  const counter = useNewtonState(counterStore);
  return (
    <div className="App">
      <h1>Increment with newtonJS</h1>
      <p>
          Value of increment in the parent: {counter.count}
      </p>
      <p>Children:</p>
      <Increment />
    </div>
  );
}

export default React.memo(App);
