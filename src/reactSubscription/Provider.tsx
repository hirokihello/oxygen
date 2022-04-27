import React, {useSyncExternalStore} from 'react'


export const ReactReduxContext =  React.createContext<any>(null as any);

function Provider({
  store,
  children,
}: { store: any, children: any}) {
  const context = {
    store: useSyncExternalStore(store.store.subscribe, store.store.getState, store.store.getState),
    dispatcher: store.store._dispatcher
  }
  return <ReactReduxContext.Provider value={context}>{children}</ReactReduxContext.Provider>
}

export {
  Provider
}