const EMPTY_STATE_HTML =
  '<p class="empty-state">No hay tareas para mostrar</p>';

/**
 * Renderer de la lista de tareas.
 *
 * SRP: su única razón de cambio es "cómo se ve una tarea en pantalla".
 * No decide reglas de negocio ni de persistencia; solo recibe datos
 * ya calculados y callbacks a ejecutar ante interacciones del usuario.
 */
export class TaskListRenderer {
  constructor(taskListElement) {
    this._taskListElement = taskListElement;
  }

  render(tasks, { onToggle, onDelete }) {
    this._taskListElement.innerHTML = '';

    if (tasks.length === 0) {
      this._taskListElement.innerHTML = EMPTY_STATE_HTML;
      return;
    }

    tasks.forEach((task) => {
      this._taskListElement.appendChild(this._buildTaskElement(task, { onToggle, onDelete }));
    });
  }

  _buildTaskElement(task, { onToggle, onDelete }) {
    const taskElement = document.createElement('div');
    taskElement.className = task.completed ? 'task-item completed' : 'task-item';

    taskElement.innerHTML = `
      <span>${this._escapeHtml(task.text)}</span>
      <div class="task-buttons">
        <button class="complete-btn" type="button">
          ${task.completed ? 'Reactivar' : 'Completar'}
        </button>
        <button class="delete-btn" type="button">Eliminar</button>
      </div>
    `;

    taskElement.querySelector('.complete-btn').addEventListener('click', () => onToggle(task.id));
    taskElement.querySelector('.delete-btn').addEventListener('click', () => onDelete(task.id));

    return taskElement;
  }

  /** Previene inyección de HTML a partir del texto ingresado por el usuario. */
  _escapeHtml(rawText) {
    const div = document.createElement('div');
    div.textContent = rawText;
    return div.innerHTML;
  }
}
