import {Counter, CounterState, CounterStore} from "./counter"
import React from "react"
import {useStore} from "react-simmor"
import {ReducerStore} from "simmor"

type CounterListState = {
  list: CounterState[]
}
export function getSum(state: {list: CounterState[]}) {
  return state.list.reduce((x, y) => x + y.value, 0)
}

export class CounterListStore extends ReducerStore<CounterListState> {

  constructor(){
    super({list: []})
  }

  add() {
    this.draft.list.push({value: 0})
  }

  resetAll(){
    this.draft.list.forEach(x => x.value = 0)
  }

}


const store = new CounterListStore()
export const CounterList = () => {
  const state = useStore(store, x => x)
  const sum = getSum(state)
  return (
    <div className="list">
          <button onClick={() => store.add()}>add</button>
          <button onClick={() => store.resetAll()}>reset all</button>
          <span>Sum {sum}</span>
      {state.list.map((x,i) => <div><Counter
          key={i}
          store={new CounterStore(store.rxState.slice('list').slice(i))}/></div> )}
    </div>
  )

}
