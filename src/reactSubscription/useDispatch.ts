import { useContext } from 'react'
import {
  ReactReduxContext,
} from './Provider'

export function createDispatchHook() {
  return function useDispatch() {
    const {dispatcher} = useContext<any>(ReactReduxContext)!
    return dispatcher;
  }
}

export const useDispatch = createDispatchHook()