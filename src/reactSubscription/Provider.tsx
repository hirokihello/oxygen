import React, { useMemo } from 'react'
interface ReactReduxContextValue {
  store: any
  subscription: any
}

export const ReactReduxContext =  React.createContext<ReactReduxContextValue>(null as any);

function Provider({
  store,
  children,
}: { store: any, children: any}) {
  const contextValue = useMemo(() => {
    // const subscription = createSubscription(store);
    const subscription = undefined;
    return {
      store,
      subscription,
    }
  }, [store])


  return <ReactReduxContext.Provider value={contextValue}>{children}</ReactReduxContext.Provider>
}

export {
  Provider
}