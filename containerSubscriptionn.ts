'use strict';

import type { Store } from './store';

import { StoreGroup } from './storeGroup';

function shallowArrayEqual(a: Array<Store<any>>, b: Array<Store<any>>): boolean {
  if (a === b) {
    return true;
  }
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

class FluxContainerSubscriptions {
  _callbacks: Array<() => void>;
  _storeGroup?: StoreGroup;
  _stores?: Array<Store<any>>;
  _tokens?: Array<{remove: () => void}>;

  constructor() {
    this._callbacks = [];
  }

  setStores(stores: Array<Store<any>>): void {
    if (this._stores && shallowArrayEqual(this._stores, stores)) {
      return;
    }
    this._stores = stores;
    this._resetTokens();
    this._resetStoreGroup();

    let changed = false;
    let changedStores = [];

    if (process.env.NODE_ENV !== 'production') {
      this._tokens = stores.map(store => store.addListener(() => {
        changed = true;
        changedStores.push(store);
      }));
    } else {
      const setChanged = () => { changed = true; };
      this._tokens = stores.map(store => store.addListener(setChanged));
    }

    const callCallbacks = () => {
      if (changed) {
        this._callbacks.forEach(fn => fn());
        changed = false;
        if (process.env.NODE_ENV !== 'production') {
          changedStores = [];
        }
      }
    };
    this._storeGroup = new StoreGroup(stores, callCallbacks);
  }

  addListener(fn: () => void): void {
    this._callbacks.push(fn);
  }

  reset(): void {
    this._resetTokens();
    this._resetStoreGroup();
    this._resetCallbacks();
    this._resetStores();
  }

  _resetTokens() {
    if (this._tokens) {
      this._tokens.forEach(token => token.remove());
      this._tokens = null;
    }
  }

  _resetStoreGroup(): void {
    if (this._storeGroup) {
      this._storeGroup.release();
      this._storeGroup = null;
    }
  }

  _resetStores(): void {
    this._stores = null;
  }

  _resetCallbacks(): void {
    this._callbacks = [];
  }
}

module.exports = FluxContainerSubscriptions;
