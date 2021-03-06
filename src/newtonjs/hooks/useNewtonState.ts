import {useState} from 'react';
import {useIsomorphicLayoutEffect} from 'react-use';
import {Store} from '../index';


const newtonState = (store: Store<any>) => {
  const [state, setState] = useState(store.initialState);
  useIsomorphicLayoutEffect(()=> {
    const subject = store.subscribe(setState);
    return () => {
      subject.unsubscribe();
    };
  }, [store.state]);
  return state;
};

export default newtonState;
