import {useEffect, useRef, useState} from "react"
import {proxyShallowEqual, proxyState} from "proxyequal"
import {RxState} from "simmor"

export function useTrackedStore<TState>(store: {
  rxState: RxState<TState>
}): TState {
  const [, forceUpdate] = useState({})
  const ref = useRef({
    proxy: proxyState(store.rxState.state),
    state: store.rxState.state,
  })

  useEffect(() => {
    const subscription = store.rxState.state$.subscribe(newState => {
      if (
        !proxyShallowEqual(
          ref.current.state,
          newState,
          ref.current.proxy.affected,
        )
      ) {
        ref.current.proxy.replaceState(newState)
        ref.current.state = newState
        forceUpdate({})
      }
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [store])

  return ref.current.proxy.state
}
