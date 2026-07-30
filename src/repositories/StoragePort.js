/**
 * Puerto (interfaz) de almacenamiento.
 *
 * DIP: TaskRepository dependerá de esta abstracción, nunca directamente
 * de `window.localStorage`. Cualquier adaptador concreto (localStorage,
 * memoria, IndexedDB, API remota...) debe implementar este contrato.
 *
 * ISP: la interfaz es mínima (get/set), no obliga a implementar métodos
 * que un adaptador concreto no necesite.
 *
 * LSP: cualquier implementación de StoragePort debe poder sustituir a
 * otra sin romper a TaskRepository (por ejemplo, en pruebas unitarias
 * se usa InMemoryStorageAdapter en lugar de LocalStorageAdapter).
 */
export class StoragePort {
  // eslint-disable-next-line no-unused-vars
  getItem(key) {
    throw new Error('getItem() debe ser implementado por la clase concreta');
  }

  // eslint-disable-next-line no-unused-vars
  setItem(key, value) {
    throw new Error('setItem() debe ser implementado por la clase concreta');
  }
}
