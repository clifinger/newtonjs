import {useState} from 'react';
import {useIsomorphicLayoutEffect} from 'react-use';
import {Store} from '../index';


const newtonAsyncValue = (store: Store<any>, key: string) => {
  if (store.initialState[key] === undefined) {
    throw new Error(`The key "${key}" is not define in your state`);
  }
  const [value, setValue] = useState(store.initialState[key]);
  useIsomorphicLayoutEffect(()=> {
    const Observable = store.subscribeToOneValue(setValue, key);
    return () => {
      Observable.unsubscribe();
    };
  }, [store.state[key]]);
  console.log(value);
  return [value.values, value.loading, value.error, value.$destroy];
};

export default newtonAsyncValue;
