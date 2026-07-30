import { StoragePort } from './StoragePort.js';

/**
 * Adaptador en memoria. Implementa el mismo contrato que
 * LocalStorageAdapter para poder sustituirlo en pruebas unitarias
 * o entornos sin `window` (Node), sin depender del DOM ni del navegador.
 */
export class InMemoryStorageAdapter extends StoragePort {
  constructor() {
    super();
    this._store = new Map();
  }

  getItem(key) {
    return this._store.has(key) ? this._store.get(key) : null;
  }

  setItem(key, value) {
    this._store.set(key, value);
  }
}
