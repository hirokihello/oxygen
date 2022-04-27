import React, { useMemo } from 'react'

export interface ReactReduxContextValue {
  store: any
  subscription: any
}

export

function Provider({
  store,
  children,
}) {
  const contextValue = useMemo(() => {
    // const subscription = createSubscription(store);
    const subscription = undefined;
    return {
      store,
      subscription,
    }
  }, [store])

  const ReactReduxContext =  React.createContext<ReactReduxContextValue>();

  return <ReactReduxContext.Provider value={contextValue}>{children}</ReactReduxContext.Provider>
}

export default Provider