import { H2, ActionTree, View } from "@hirokihello/hydrogen";

type State = typeof state;
type Actions = typeof actions;

const state = {
  count: 0
};

const actions: ActionTree<State> = {
  increment: (state: State) => {
    state.count++;
  }
};

const getStores = () =>  {
  return [FooStore];
}

const calculateState = () =>  {
  return {
    foo: FooStore.getState(),
  };
}

// const view: View<State, Actions> = (state, actions) => {
//   const a = (<div class="hgoehgoe">
//                 hydrogen init!!!!!!!!
//                 <p>{state.count}</p>
//                 <button onclick={() => actions.increment(state)} >count up</button>
//               </div>
//               );
//   return a;
// };


const viewFn = (state, actions, props) => {
    const a = (<div class="hgoehgoe">
                  hydrogen init!!!!!!!!
                  <p>this is the component state count {state.count}</p>
                  <button onclick={() => actions.increment(state)} >component state count up</button>
                  <p>this is the component state count {props.count.num}</p>
                  <button onclick={() => props.countUp} >component state count up</button>
                </div>
                );
    return a;
};


// new H2<State>({
//   el: "#app",
//   state,
//   view,
//   actions
// });
