import { StoragePort } from './StoragePort.js';

/**
 * Adaptador concreto que envuelve la Web Storage API (localStorage).
 *
 * LSP: puede sustituir a StoragePort en cualquier punto del sistema
 * sin alterar el comportamiento esperado por quien lo consume.
 */
export class LocalStorageAdapter extends StoragePort {
  getItem(key) {
    return window.localStorage.getItem(key);
  }

  setItem(key, value) {
    window.localStorage.setItem(key, value);
  }
}
