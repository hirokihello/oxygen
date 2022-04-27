export class Dispatcher {
  _store_callbacks: any;
  _last_store_id: number;

  constructor() {
    this._store_callbacks = {};
    this._last_store_id = -1;
  }

  register(callback_fn: Function): void {
    this._last_store_id++;
    this._store_callbacks[this._last_store_id] = callback_fn;
  }

  //payload
  // { action_name: string, ...args }
  dispatch(payload: any) {
    // 登録された全てのcallbackを実行する
    for(let id in this._store_callbacks) {
      this._store_callbacks[id](payload);
    }
  }
}