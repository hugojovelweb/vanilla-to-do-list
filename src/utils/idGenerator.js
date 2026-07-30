/**
 * Generador incremental de identificadores.
 *
 * SRP: aísla la política de generación de IDs. Si mañana se decide usar
 * UUID en vez de un contador incremental, solo se reemplaza esta clase
 * (OCP) sin modificar TaskService ni el resto del sistema.
 */
export class IncrementalIdGenerator {
  constructor(initialValue = 1) {
    this.currentId = initialValue;
  }

  /** Calcula el próximo id disponible a partir de una colección existente de tareas. */
  static fromExistingTasks(tasks) {
    const maxId = tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) : 0;
    return new IncrementalIdGenerator(maxId + 1);
  }

  next() {
    return this.currentId++;
  }
}
