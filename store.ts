import type { Dispatcher } from './dispatcher';
const EventEmitter = require('events');
const abstractMethod = require('./abstractMethod');
const invariant = require('invariant');

class Store<TState> {
  _dispatchToken: string;
  __changed: boolean;
  __changeEvent: string;
  __className: any;
  __dispatcher: Dispatcher<any>;
  __emitter: typeof EventEmitter;
  _state: TState;

  constructor(dispatcher: Dispatcher<any>) {
    this.__className = this.constructor.name;

    this.__changed = false;
    this.__changeEvent = 'change';
    this.__dispatcher = dispatcher;
    this.__emitter = new EventEmitter();
    this._dispatchToken = dispatcher.register((payload) => {
      this.__invokeOnDispatch(payload);
    });
    this._state = this.getInitialState();
  }

  addListener(callback: (eventType?: string) => void): {remove: () => void} {
    return this.__emitter.addListener(this.__changeEvent, callback);
  }

  getDispatcher(): Dispatcher<any> {
    return this.__dispatcher;
  }

  getDispatchToken(): string {
    return this._dispatchToken;
  }

  hasChanged(): boolean {
    invariant(
      this.__dispatcher.isDispatching(),
      '%s.hasChanged(): Must be invoked while dispatching.',
      this.__className
    );
    return this.__changed;
  }

  __emitChange(): void {
    invariant(
      this.__dispatcher.isDispatching(),
      '%s.__emitChange(): Must be invoked while dispatching.',
      this.__className
    );
    this.__changed = true;
  }
  getState(): TState {
    return this._state;
  }

  /**
   * Constructs the initial state for this store. This is called once during
   * construction of the store.
   */
  getInitialState(): TState {
    return abstractMethod('FluxReduceStore', 'getInitialState');
  }

  /**
   * Used to reduce a stream of actions coming from the dispatcher into a
   * single state object.
   */
  reduce(state: TState, action: Object): TState {
    return abstractMethod('FluxReduceStore', 'reduce');
  }

  /**
   * Checks if two versions of state are the same. You do not need to override
   * this if your state is immutable.
   */
  areEqual(one: TState, two: TState): boolean {
    return one === two;
  }

  __invokeOnDispatch(action: Object): void {
    this.__changed = false;

    // Reduce the stream of incoming actions to state, update when necessary.
    const startingState = this._state;
    const endingState = this.reduce(startingState, action);

    // This means your ending state should never be undefined.
    invariant(
      endingState !== undefined,
      '%s returned undefined from reduce(...), did you forget to return ' +
      'state in the default case? (use null if this was intentional)',
      this.constructor.name,
    );

    if (!this.areEqual(startingState, endingState)) {
      this._state = endingState;

      // `__emitChange()` sets `this.__changed` to true and then the actual
      // change will be fired from the emitter at the end of the dispatch, this
      // is required in order to support methods like `hasChanged()`
      this.__emitChange();
    }

    if (this.__changed) {
      this.__emitter.emit(this.__changeEvent);
    }
  }
}

export {
  Store
};
