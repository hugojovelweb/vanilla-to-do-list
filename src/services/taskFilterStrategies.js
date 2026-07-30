import { FILTER_TYPES } from '../constants/filterTypes.js';

/**
 * Estrategias de filtrado (patrón Strategy).
 *
 * OCP: agregar un nuevo filtro (por ejemplo "creadas hoy") consiste
 * en añadir una nueva entrada a este mapa, sin modificar TaskService
 * ni ningún otro módulo que ya esté probado y funcionando.
 */
export const taskFilterStrategies = Object.freeze({
  [FILTER_TYPES.ALL]: (tasks) => tasks,
  [FILTER_TYPES.ACTIVE]: (tasks) => tasks.filter((task) => !task.completed),
  [FILTER_TYPES.COMPLETED]: (tasks) => tasks.filter((task) => task.completed),
});

export function applyTaskFilter(tasks, filterType) {
  const strategy = taskFilterStrategies[filterType] ?? taskFilterStrategies[FILTER_TYPES.ALL];
  return strategy(tasks);
}
