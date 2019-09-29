import * as React from "react"
import {act, renderHook} from "@testing-library/react-hooks"
import {useLocalStore} from "../src/useLocalStore"

it('useLocalStore', () => {
  const { result } = renderHook(() =>
    useLocalStore({value: 1}, ctx => ({
      increase() {
        ctx.draft.value += 1
      }
    })))

  expect(result.current[0].value).toBe(1)

  act(() => {
    result.current[1].increase()
  })

  expect(result.current[0].value).toBe(2)

});
