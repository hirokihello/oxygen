import { Dispatcher } from "../Dispatcher";
import{ Store } from  "../Store";

export const create_store = ({reducer, initial_state}: any) => {
  const dispatcher = new Dispatcher();
  const store_payload = {
    dispatcher,
    reducer,
    initial_state
  }
  const store = new Store(store_payload);

  return { store, dispatcher };
}