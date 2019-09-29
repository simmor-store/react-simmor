import React from "react"
import {useLocalStore} from "react-simmor"


export const CounterWithLocalStore = () => {
  const [state, dispatch] = useLocalStore({value: 0}, ctx => ({
    increase() {
      ctx.draft.value += 1
    },
    increaseWithDelay() {
      setTimeout(() => this.increase(), 300)
    },
    decrease() {
      const newValue = ctx.draft.value - 1
      if (newValue >= 0) {
        ctx.draft.value = newValue
      }
    },
    setValue(value: number) {
      ctx.draft.value = value
    }
  }))
  return (
    <div className="counter">
      <span>{state.value}</span>
      <button onClick={() => dispatch.increase()}>+</button>
      <button onClick={() => dispatch.decrease()}>-</button>
      <button onClick={() => dispatch.setValue(0)}>Reset</button>
      <button onClick={() => dispatch.increaseWithDelay()}>Increase with delay</button>
    </div>
  )
}

