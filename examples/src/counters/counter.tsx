import React from "react"
import {useStore} from "react-simmor"
import {ReducerStore} from "simmor"

export type CounterState = { value: number }

export class CounterStore extends ReducerStore<CounterState> {

  increase() {
    this.draft.value += 1
  }

  decrease() {
    const newValue = this.draft.value - 1
    if (newValue >= 0) {
      this.draft.value = newValue
    }
  }

  setValue(value: number) {
    this.draft.value = value
  }
}

export const Counter = (props: { store: CounterStore }) => {
  const value = useStore(props.store, x => x.value)
  return (
    <div className="counter"><span>{value}</span>
      <button onClick={() => props.store.increase()}>+</button>
      <button onClick={() => props.store.decrease()}>-</button>
      <button onClick={() => props.store.setValue(0)}>Reset</button>
    </div>
  )
}

