export class Dispatcher {
  store_callbacks: any;

  constructor() {
    this.store_callbacks = {};
  }

  //payload
  // { action_name: string, ...args }
  dispatch(payload: any) {
    // 登録された全てのcallbackを実行する
    for(let id in this.store_callbacks) {
      this.store_callbacks[id](payload);
    }
  }
}