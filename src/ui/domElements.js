/**
 * Único punto de acceso a los elementos del DOM utilizados por la app.
 *
 * Clean Code: evita repetir `document.getElementById('...')` disperso
 * por todo el código y centraliza el acoplamiento con la estructura
 * del HTML en un solo lugar fácil de mantener.
 */
export function getDomElements() {
  return {
    taskInput: document.getElementById('taskInput'),
    addButton: document.getElementById('addBtn'),
    taskList: document.getElementById('taskList'),
    statsContainer: document.getElementById('stats'),
    filterButtons: Array.from(document.querySelectorAll('.filter-btn')),
  };
}
