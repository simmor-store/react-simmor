import React from 'react';
import {Counter, CounterStore} from "./counters/counter"
import {CounterPair} from "./counters/counterPair"
import {CounterList} from "./counters/counterList"
const store = new CounterStore({value: 0})
const App: React.FC = () => {
  return (
      <div>
          <h2>Counter</h2>
          <Counter store={store}/>
          <h2>Pair</h2>
          <CounterPair/>
          <h2>List</h2>
          <CounterList/>
      </div>
  );
}

export default App;
