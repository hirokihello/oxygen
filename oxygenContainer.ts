import { H2, ActionTree, View } from "@hirokihello/hydrogen";
import {view} from "./hoge"

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


function create () {

  class OxygenContainer extends H2<State> {}

  return new OxygenContainer({
    el: "#app",
    state,
    view,
    actions
  })
}

export { create }
