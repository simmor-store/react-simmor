import {RxState, select} from "simmor"
import {useEffect, useState} from "react"

export function useStore<TState, TResult>(
  store: {rxState: RxState<TState>},
  project: (store: TState) => TResult,
): TResult {
  const [state, setState] = useState(project(store.rxState.state))

  useEffect(() => {
    const subscription = store.rxState.state$
      .pipe(select(project))
      .subscribe(value => {
        setState(value)
      })
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return state
}
