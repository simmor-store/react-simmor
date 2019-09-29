import React from 'react';
import {Counter, CounterStore} from "./counters/counter"
import {CounterPair} from "./counters/counterPair"
import {CounterList} from "./counters/counterList"
import {createLocalStorageMiddleware} from "./counters/localStorageMiddleware"
import {CounterWithLocalStore} from "./counters/localCounter"
const store = new CounterStore({value: 0})
const persistentStore = new CounterStore({value: 0}, {
    middlewares: [createLocalStorageMiddleware('counter')]})
const App: React.FC = () => {
  return (
      <div>
        <h3>Counter with local store</h3>
        <CounterWithLocalStore/>
        <h3>Counter</h3>
        <Counter store={store}/>
        <h3>Pair</h3>
        <CounterPair/>
        <h3>List</h3>
        <CounterList/>
        <h3>Persistent counter</h3>
        <Counter store={persistentStore}/>
      </div>
  );
}

export default App;
