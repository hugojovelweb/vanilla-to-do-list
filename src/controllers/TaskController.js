/**
 * Controlador de la funcionalidad de tareas.
 *
 * SRP: su única responsabilidad es orquestar: escucha eventos de la UI,
 * invoca al TaskService (lógica de negocio) y pide a los renderers que
 * actualicen la pantalla. No contiene reglas de negocio ni manipula el
 * DOM directamente (delegado a los renderers), ni conoce el mecanismo
 * de persistencia (delegado al repositorio dentro del servicio).
 */
export class TaskController {
  constructor({ taskService, dom, taskListRenderer, statsRenderer, filterButtonsRenderer }) {
    this._taskService = taskService;
    this._dom = dom;
    this._taskListRenderer = taskListRenderer;
    this._statsRenderer = statsRenderer;
    this._filterButtonsRenderer = filterButtonsRenderer;
  }

  init() {
    this._bindEvents();
    this._refreshView();
  }

  _bindEvents() {
    this._dom.addButton.addEventListener('click', () => this._handleAddTask());

    this._dom.taskInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        this._handleAddTask();
      }
    });

    this._dom.filterButtons.forEach((button) => {
      button.addEventListener('click', () => this._handleFilterChange(button.dataset.filter));
    });
  }

  _handleAddTask() {
    try {
      this._taskService.addTask(this._dom.taskInput.value);
      this._dom.taskInput.value = '';
      this._refreshView();
    } catch (error) {
      // Manejo explícito de errores en la capa de UI, en vez de un alert()
      // disperso dentro de la lógica de negocio.
      this._showValidationError(error.message);
    }
  }

  _handleToggleTask(taskId) {
    this._taskService.toggleTaskCompletion(taskId);
    this._refreshView();
  }

  _handleDeleteTask(taskId) {
    this._taskService.deleteTask(taskId);
    this._refreshView();
  }

  _handleFilterChange(filterType) {
    this._taskService.setFilter(filterType);
    this._refreshView();
  }

  _refreshView() {
    this._taskListRenderer.render(this._taskService.getVisibleTasks(), {
      onToggle: (taskId) => this._handleToggleTask(taskId),
      onDelete: (taskId) => this._handleDeleteTask(taskId),
    });
    this._statsRenderer.render(this._taskService.getStats());
    this._filterButtonsRenderer.highlightActiveFilter(this._taskService.getCurrentFilter());
  }

  _showValidationError(message) {
    window.alert(message);
  }
}
