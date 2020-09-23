'use strict';
import invariant from 'invariant';

export type DispatchToken = string;
export type DispatcherType = typeof Dispatcher

const _prefix = 'ID_';

interface Callbacks<TPayload> {
  [key: string]: (payload: TPayload) => void
}

class Dispatcher<TPayload> {
  _callbacks: Callbacks<TPayload>;
  _isDispatching: boolean;
  _lastID: number;
  _pendingPayload: TPayload;

  constructor() {
    this._callbacks = {};
    this._isDispatching = false;
    this._lastID = 1;
  }

  // callbackを登録する。
  register(callback: (payload: TPayload) => void): DispatchToken {
    const id = _prefix + this._lastID++;
    this._callbacks[id] = callback;
    return id;
  }

  // payloadを受け取って、それを全てのregisterされているcallbackで発火させる。
  dispatch(payload: TPayload): void {
    invariant(
      !this._isDispatching,
      'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.'
    );

    this._startDispatching(payload);

    try {
      for (let id in this._callbacks) {
        this._callbacks[id](this._pendingPayload);
      }
    } finally {
      this._stopDispatching();
    }
  }

  isDispatching(): boolean {
    return this._isDispatching;
  }

  _startDispatching(payload: TPayload): void {
    this._pendingPayload = payload;
    this._isDispatching = true;
  }

  _stopDispatching(): void {
    delete this._pendingPayload;
    this._isDispatching = false;
  }
}

export {
  Dispatcher
};
