/**
 * Tipos de filtro soportados por la lista de tareas.
 *
 * Se centraliza en una única fuente de verdad para evitar "magic strings"
 * repetidos por todo el código (Clean Code) y para que agregar un nuevo
 * filtro en el futuro no requiera tocar la lógica existente (OCP).
 */
export const FILTER_TYPES = Object.freeze({
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
});

export const DEFAULT_FILTER = FILTER_TYPES.ALL;
