import React from 'react';
import './App.css';
import { create_store } from "./flux/reactSubscription/CreateStore";
import { Provider } from "./flux/reactSubscription/Provider";

import Aaa from "./Child";

const reducer = (action: string, prevState: any) => {
  switch (action) {
    case 'increment_1':
      return { ...prevState, num_1: prevState.num_1 + 1};
    case 'increment_2':
      return { ...prevState, num_2: prevState.num_2 + 1};
    default:
      return { num_1: 0, num_2: 0};
  }
}

const initial_state = {
  num_1: 0,
  num_2: 0
}

const store = create_store({initial_state, reducer});

function App() {
  return (
    <Provider store={store}>
      <Aaa></Aaa>
    </Provider>
  );
}

export default App;
