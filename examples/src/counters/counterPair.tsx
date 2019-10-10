import {Counter, CounterState, CounterStore} from "./counter"
import React from "react"
import {useStore} from "react-simmor"
import {ReducerStore} from "simmor"

type CounterPairState = {
  left: CounterState
  right: CounterState
}

export class CounterPairStore extends ReducerStore<CounterPairState> {
  leftStore = new CounterStore(this.slice('left'))
  rightStore = new CounterStore(this.slice('right'))

  constructor() {
    super({left: {value: 100}, right: {value: 200}})
  }

  swap() {
    const [leftValue, rightValue] = [this.state.left.value, this.state.right.value]
    this.leftStore.setValue(rightValue)
    this.rightStore.setValue(leftValue)
  }

  static sum(state: CounterPairState) {
    return state.left.value + state.right.value
  }
}

const store = new CounterPairStore()
export const CounterPair = () => {
  const state = useStore(store, x => x)
  const sum = CounterPairStore.sum(state)

  return (
    <div className="pair">
      <div>
        <button onClick={() => store.swap()}>swap</button>
        <span>Sum {sum}</span>
      </div>
      <Counter store={store.leftStore}/>
      <Counter store={store.rightStore}/>
    </div>
  )

}
