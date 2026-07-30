import './style.css';

import { LocalStorageAdapter } from './repositories/LocalStorageAdapter.js';
import { TaskRepository } from './repositories/TaskRepository.js';
import { IncrementalIdGenerator } from './utils/idGenerator.js';
import { TaskService } from './services/TaskService.js';
import { getDomElements } from './ui/domElements.js';
import { TaskListRenderer } from './ui/TaskListRenderer.js';
import { StatsRenderer } from './ui/StatsRenderer.js';
import { FilterButtonsRenderer } from './ui/FilterButtonsRenderer.js';
import { TaskController } from './controllers/TaskController.js';

/**
 * Composition root.
 * Hugo Ernesto Jovel Hernandez FSJ36
 *
 * DIP en acción: aquí, y solo aquí, se decide qué implementación
 * concreta de cada abstracción se usará (LocalStorageAdapter en este
 * caso). Cambiar de almacenamiento en el futuro (por ejemplo a una API
 * remota) implica escribir un nuevo adaptador y modificar únicamente
 * esta función, sin tocar TaskService, TaskController ni los renderers.
 */
function bootstrapApp() {
  const storage = new LocalStorageAdapter();
  const taskRepository = new TaskRepository(storage);
  const idGenerator = IncrementalIdGenerator.fromExistingTasks(taskRepository.findAll());
  const taskService = new TaskService(taskRepository, idGenerator);

  const dom = getDomElements();

  const controller = new TaskController({
    taskService,
    dom,
    taskListRenderer: new TaskListRenderer(dom.taskList),
    statsRenderer: new StatsRenderer(dom.statsContainer),
    filterButtonsRenderer: new FilterButtonsRenderer(dom.filterButtons),
  });

  controller.init();
}

window.addEventListener('DOMContentLoaded', bootstrapApp);
