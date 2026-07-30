/** Hugo Ernesto Jovel Hernandez... 
 *  
 * Entidad de dominio "Task".
 *
 * Responsabilidad única (SRP): representar una tarea y las reglas
 * que le pertenecen exclusivamente a ella (crear, alternar su estado,
 * serializar/deserializar). No sabe nada de almacenamiento, DOM ni filtros.
 */
export class Task {
  constructor({ id, text, completed = false, createdAt = new Date().toISOString() }) {
    this.id = id;
    this.text = text;
    this.completed = completed;
    this.createdAt = createdAt;
  }

  /** Alterna el estado de completado. Regla de negocio propia de la entidad. */
  toggleCompleted() {
    this.completed = !this.completed;
  }

  /** Reconstruye una instancia de Task a partir de un objeto plano (ej. localStorage). */
  static fromJSON(plainObject) {
    return new Task(plainObject);
  }

  /** Convierte la instancia a un objeto plano serializable. */
  toJSON() {
    return {
      id: this.id,
      text: this.text,
      completed: this.completed,
      createdAt: this.createdAt,
    };
  }
}
