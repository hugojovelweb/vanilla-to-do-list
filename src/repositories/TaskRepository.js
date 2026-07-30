import { Task } from '../models/Task.js';

const STORAGE_KEY = 'tasks';

/**
 * Repositorio de tareas.
 *
 * SRP: su única responsabilidad es traducir entre el modelo de dominio
 * (Task) y el mecanismo de persistencia.
 * DIP: depende de la abstracción StoragePort recibida por inyección de
 * dependencias en el constructor, no de una implementación concreta.
 * Manejo de errores: captura fallos de parseo/almacenamiento (por ejemplo,
 * localStorage corrupto o deshabilitado) en vez de dejar que la app truene.
 */
export class TaskRepository {
  constructor(storagePort) {
    this._storage = storagePort;
  }

  findAll() {
    const rawData = this._storage.getItem(STORAGE_KEY);

    if (!rawData) {
      return [];
    }

    try {
      const parsedTasks = JSON.parse(rawData);
      return parsedTasks.map(Task.fromJSON);
    } catch (error) {
      console.error('No se pudieron leer las tareas guardadas, se inicia con una lista vacía.', error);
      return [];
    }
  }

  saveAll(tasks) {
    try {
      const serializedTasks = JSON.stringify(tasks.map((task) => task.toJSON()));
      this._storage.setItem(STORAGE_KEY, serializedTasks);
    } catch (error) {
      console.error('No se pudieron guardar las tareas.', error);
    }
  }
}
