import type { Dispatcher } from './dispatcher';
import type { Store } from './store';

var invariant = require('invariant');

type DispatchToken = string;

class StoreGroup {
  _dispatcher: Dispatcher<any>;
  _dispatchToken: DispatchToken;

  constructor(stores: Array<Store<any>>, callback: Function) {
    this._dispatcher = _getUniformDispatcher(stores);
    this._dispatchToken = this._dispatcher.register(() => {
      callback();
    });
  }
}

function _getUniformDispatcher(stores: Array<Store<any>>): Dispatcher<any> {
  invariant(
    stores && stores.length,
    'Must provide at least one store to StoreGroup'
  );
  var dispatcher = stores[0].getDispatcher();
  if (process.env.environment === 'development') {
    for (var store of stores) {
      invariant(
        store.getDispatcher() === dispatcher,
        'All stores in a StoreGroup must use the same dispatcher'
      );
    }
  }
  return dispatcher;
}

export {
  StoreGroup
};
