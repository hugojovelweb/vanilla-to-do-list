/**
 * Validación de entrada del usuario.
 *
 * SRP: una única función con una única razón para cambiar (las reglas
 * de validación de texto). Se reutiliza tanto en el controlador como
 * en pruebas unitarias sin depender del DOM.
 */
export function isValidTaskText(text) {
  return typeof text === 'string' && text.trim().length > 0;
}

export function sanitizeTaskText(text) {
  return text.trim();
}
