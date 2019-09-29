import {
  Actions,
  createLocalStore,
  defaultReducerOptions,
  InitialState,
  LocalReducer,
} from "simmor"
import {useStore} from "./useStore"
import {DependencyList, useMemo} from "react"

export function useLocalStore<TState, TActions extends Actions>(
  initialState: InitialState<TState>,
  reducer: LocalReducer<TState, TActions>,
  options = defaultReducerOptions,
  deps?: DependencyList,
): [TState, TActions] {
  const store = useMemo(
    () => createLocalStore(initialState, reducer, options),
    deps,
  )
  const state = useStore(store, x => x)
  return [state, store.dispatch]
}
