import { useContext } from 'react'

import {
  ReactReduxContext,
} from './Provider'

export function createStoreHook() {
  return function useStore() {
    const { store } = useContext(ReactReduxContext)!
    return store;
  }
}

export const useStore = createStoreHook()