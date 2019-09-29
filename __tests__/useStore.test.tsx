import {act, render} from "@testing-library/react"
import {useStore} from "../src/useStore"
import * as React from "react"
import {useTrackedStore} from "../src/useTrackedStore"
import {ReducerStore} from "simmor"

export class TestStore extends ReducerStore<{value: number, array: number[]}> {
  constructor() {
    super({
      value: 1,
      array: [1, 2]
    })
  }
  increase() {
    this.draft.value += 1
  }
  updateArrayAt(index: number) {
    this.draft.array[index] += 1
  }
}

type Props = {store: TestStore, onRender: () => void}

export const UseStoreComponent = React.memo(({store, onRender}: Props) => {
  onRender()
  const value = useStore(store, x => x.value)
  return <div data-testid="value">{value}</div>
})

function testUseStore(Component: React.FunctionComponent<Props>, next = () => {}){
  const store = new TestStore()
  let renderCount = 0
  const onRender = () => {
    renderCount++
  }

  const container = render(<Component store={store} onRender={onRender}/>);
  expect(renderCount).toBe(1)
  expect(container.getByTestId("value").innerHTML).toBe("1")

  act(() => {
    store.increase()
  })

  expect(container.getByTestId("value").innerHTML).toBe("2")
  expect(renderCount).toBe(2)

  act(() => {
    store.increase()
  })

  expect(container.getByTestId("value").innerHTML).toBe("3")
  expect(renderCount).toBe(3)

  act(() => {
    store.updateArrayAt(0)
  })

  expect(renderCount).toBe(3)

}

it('useStore', () => {
  testUseStore(UseStoreComponent)
})

export const UseTrackedStoreComponent = React.memo(({store, onRender}: {store: TestStore, onRender: () => void}) => {
  onRender()
  const state = useTrackedStore(store)
  return <div>
    <div data-testid="value">{state.value}</div>
    <div>{state.array[1]}</div>
  </div>
})

it('useTrackedStore', () => {
  testUseStore(UseTrackedStoreComponent)
})
