import {useState} from 'react';
import {useIsomorphicLayoutEffect} from 'react-use';
import {Store} from '../index';


const newtonValue = (store: Store<any>, key: string) => {
  if (typeof store.initialState[key] === 'undefined') {
    throw new Error(`The key "${key}" is not define in your state`);
  }
  const [value, setValue] = useState(store.initialState[key]);
  useIsomorphicLayoutEffect(()=> {
    const Observable = store.subscribeToOneValue(setValue, key);
    return () => {
      Observable.unsubscribe();
    };
  }, [store.state[key]]);
  return value;
};

export default newtonValue;
