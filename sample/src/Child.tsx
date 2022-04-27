import React from 'react';
import './App.css';
import { useStore } from "./flux/reactSubscription/useStore";
import { useDispatch } from "./flux/reactSubscription/useDispatch";

function App() {
  const { store } = useStore();
  const dispatcher = useDispatch();
  return (
    <div className="App">
      <h1>sample app</h1>

      <button onClick={() => dispatcher.dispatch('increment_1')}>add num_1: { store.num_1 }</button>
      <button onClick={() => dispatcher.dispatch('increment_2')}>add num_2: { store.num_2 }</button>
    </div>
  );
}

export default App;
