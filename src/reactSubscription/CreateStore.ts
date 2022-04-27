import { Dispatcher } from "../Dispatcher";
import{ Store } from  "../store";

export const create_store = ({reducer, initial_state}) => {
  const dispatcher = new Dispatcher();
  const store_payload = {
    dispatcher,
    reducer,
    initial_state
  }
  const store = new Store(store_payload);

  return store;
}