import {EventEmitter} from 'events';

export class Store {
  _reducer: (old_state: any, payload: any) => any;
  _state: any;
  _evt: any;
  _dispatcher: any;

  constructor(properties: { reducer: any, initial_state: any, dispatcher: any }) {
    this._reducer = properties.reducer;
    this._state = properties.initial_state;
    this._evt = new EventEmitter();
    this._dispatcher = properties.dispatcher;
    properties.dispatcher.register((payload: any) => this._onDispatched(payload));
  }

  _are_equal(old_state: any, new_state: any): boolean {
    return old_state === new_state;
  }


  _onDispatched(payload: any) {
    const startingState = this._state;
    const endingState = this._reducer(payload, startingState);
    if(!this._are_equal(startingState, endingState)) {
      this._state = endingState;
      this._evt.emit('change');
    }
  }

  public subscribe = (sub: (state: any) => void) => {
    const innerSub = () => {
      sub(this._state);
    };
    this._evt.on('change', innerSub);
    return () => this._evt.removeListener('change', innerSub);
  };

  public getState = () => {
    return this._state;
  }
}
