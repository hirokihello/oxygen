import { useContext } from 'react'
import {
  ReactReduxContext,
} from './Provider'

export const useStore = () => {
  const { store } = useContext(ReactReduxContext)!;
  return { store };
}