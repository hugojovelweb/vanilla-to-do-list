import { Task } from '../models/Task.js';
import { isValidTaskText, sanitizeTaskText } from '../utils/taskValidator.js';
import { applyTaskFilter } from './taskFilterStrategies.js';
import { DEFAULT_FILTER } from '../constants/filterTypes.js';

/**
 * Servicio de aplicación para la gestión de tareas.
 *
 * SRP: coordina las reglas de negocio (agregar, completar, eliminar,
 * filtrar, calcular estadísticas). No conoce el DOM ni el mecanismo
 * de persistencia concreto: recibe un TaskRepository y un IdGenerator
 * por inyección de dependencias (DIP).
 */
export class TaskService {
  constructor(taskRepository, idGenerator) {
    this._repository = taskRepository;
    this._idGenerator = idGenerator;
    this._tasks = this._repository.findAll();
    this._currentFilter = DEFAULT_FILTER;
  }

  /**
   * Agrega una nueva tarea.
   * @throws {Error} si el texto no es válido, para que la capa de UI
   * decida cómo comunicar el error (evita usar alert() dentro del dominio).
   */
  addTask(rawText) {
    if (!isValidTaskText(rawText)) {
      throw new Error('El texto de la tarea no puede estar vacío.');
    }

    const task = new Task({
      id: this._idGenerator.next(),
      text: sanitizeTaskText(rawText),
    });

    this._tasks.push(task);
    this._persist();
    return task;
  }

  toggleTaskCompletion(taskId) {
    const task = this._findTaskById(taskId);

    if (!task) {
      console.warn(`No existe una tarea con id ${taskId}.`);
      return;
    }

    task.toggleCompleted();
    this._persist();
  }

  deleteTask(taskId) {
    this._tasks = this._tasks.filter((task) => task.id !== taskId);
    this._persist();
  }

  setFilter(filterType) {
    this._currentFilter = filterType;
  }

  getCurrentFilter() {
    return this._currentFilter;
  }

  getVisibleTasks() {
    return applyTaskFilter(this._tasks, this._currentFilter);
  }

  getStats() {
    const total = this._tasks.length;
    const completed = this._tasks.filter((task) => task.completed).length;
    return { total, completed, active: total - completed };
  }

  _findTaskById(taskId) {
    return this._tasks.find((task) => task.id === taskId);
  }

  _persist() {
    this._repository.saveAll(this._tasks);
  }
}
