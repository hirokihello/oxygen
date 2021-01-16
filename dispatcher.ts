// callbackが登録される
// 全ての登録されたcallbackに対してpayloadをbroadcastする
// 今回はwaitForを使って依存関係を作り出し順番の制御をする


export type DispatchToken = string;

const _prefix = 'ID_';

class Dispatcher<TPayload> {
  _callbacks: {[key: string]: (payload: TPayload) => void};
  _isDispatching: boolean;
  _isHandled: {[key: string]: boolean};
  _isPending: {[key: string]: boolean};
  _lastID: number;
  _pendingPayload: TPayload;

  constructor() {
    this._callbacks = {};
    this._isDispatching = false;
    this._isHandled = {};
    this._isPending = {};
    this._lastID = 1;
  }

  /**
   * Registers a callback to be invoked with every dispatched payload. Returns
   * a token that can be used with `waitFor()`.
   */
  // callbackを受け取り、それに自動でインクリメントされたkeyを作ってkvで保持する。
  register(callback: (payload: TPayload) => void): DispatchToken {
    // ex.) ID_3
    const id = _prefix + this._lastID++;
    this._callbacks[id] = callback;
    return id;
  }


  // /**
  //  * Dispatches a payload to all registered callbacks.
  //  */
  dispatch(payload: TPayload): void {
    // invariant(
    //   !this._isDispatching,
    //   'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.'
    // );
    this._startDispatching(payload);

    try {
      for (const id in this._callbacks) {
        // そのidをもつcallbackがisPendingに登録されていないかをチェック
        // 登録されていたら飛ばす。
        if (this._isPending[id]) {
          continue;
        }
        this._invokeCallback(id);
      }
    } finally {
      // this._stopDispatching();
    }
  }

  // 全てがまだ扱われていないことを保証
  // payloadをpendingPayloadに登録してあげる
  _startDispatching(payload: TPayload): void {
    for (const id in this._callbacks) {
      this._isPending[id] = false;
      this._isHandled[id] = false;
    }
    this._pendingPayload = payload;
    this._isDispatching = true;
  }

  _invokeCallback(id: DispatchToken): void {
    this._isPending[id] = true;
    this._callbacks[id](this._pendingPayload);
    this._isHandled[id] = true;
  }

  // /**
  //  * Waits for the callbacks specified to be invoked before continuing execution
  //  * of the current callback. This method should only be used by a callback in
  //  * response to a dispatched payload.
  //  */
  // waitFor(ids: Array<DispatchToken>): void {
  //   invariant(
  //     this._isDispatching,
  //     'Dispatcher.waitFor(...): Must be invoked while dispatching.'
  //   );
  //   for (const ii = 0; ii < ids.length; ii++) {
  //     const id = ids[ii];
  //     if (this._isPending[id]) {
  //       invariant(
  //         this._isHandled[id],
  //         'Dispatcher.waitFor(...): Circular dependency detected while ' +
  //         'waiting for `%s`.',
  //         id
  //       );
  //       continue;
  //     }
  //     invariant(
  //       this._callbacks[id],
  //       'Dispatcher.waitFor(...): `%s` does not map to a registered callback.',
  //       id
  //     );
  //     this._invokeCallback(id);
  //   }
  // }


  // /**
  //  * Is this Dispatcher currently dispatching.
  //  */
  // isDispatching(): boolean {
  //   return this._isDispatching;
  // }

  // 登録してあるpayloadを削除してdispatch状態の解放を行う
  _stopDispatching(): void {
    delete this._pendingPayload;
    this._isDispatching = false;
  }
}

module.exports = Dispatcher;
