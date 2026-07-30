/**
 * Renderer de estadísticas (total / completadas / activas).
 * SRP: separado de TaskListRenderer porque cambia por razones distintas
 * (formato del resumen) a las de la lista de tareas.
 */
export class StatsRenderer {
  constructor(statsElement) {
    this._statsElement = statsElement;
  }

  render({ total, completed, active }) {
    this._statsElement.textContent = `Total: ${total} | Completadas: ${completed} | Activas: ${active}`;
  }
}
