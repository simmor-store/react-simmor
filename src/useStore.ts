import {RxState, select} from "simmor"
import {useEffect, useRef, useState} from "react"
import {shallowEqual} from "./shallowEqual"

export function useStore<TState, TResult>(
  store: {rxState: RxState<TState>},
  project: (store: TState) => TResult,
): TResult {
  const projectRef = useRef(project)
  useEffect(() => {
    projectRef.current = project
  })

  const [, forceUpdate] = useState({})

  const stateRef = useRef(projectRef.current(store.rxState.state))

  useEffect(() => {
    const subscription = store.rxState.state$.subscribe(value => {
      const prevState = stateRef.current
      const newState = projectRef.current(value)
      stateRef.current = newState
      if (!shallowEqual(prevState, newState)) {
        forceUpdate({})
      }
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [store])

  return stateRef.current
}
