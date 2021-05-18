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
      <header className="App-header">
        <p>Increment with newtonJS</p>
        <p>
          Value of increment in the parent: {counter.count}
        </p>
        <p>Children:</p>
        <Increment />
      </header>
    </div>
  );
}

export default React.memo(App);
