export class Store {
  _reducer: (old_state: any, payload: any) => any;
  _state: any;

  constructor(properties: { reducer: any, initial_state: any, dispatcher: any }) {
    this._reducer = properties.reducer;
    this._state = properties.initial_state;
    properties.dispatcher.register((payload: any) => this._onDispatched(payload));
  }

  _are_equal(old_state: any, new_state: any): boolean {
    return old_state === new_state;
  }

  get_state() {
    return this._state;
  }

  _onDispatched(payload) {
    const startingState = this._state;
    const endingState = this._reducer(startingState, payload);

    if(!this._are_equal(startingState, endingState)) {
      this._state = endingState;
    }
  }
}
