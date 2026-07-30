/**
 * Controla el estado visual (clase "active") de los botones de filtro.
 * SRP: separado del resto de la UI porque su única razón de cambio es
 * cómo se resalta el filtro seleccionado.
 */
export class FilterButtonsRenderer {
  constructor(filterButtonElements) {
    this._filterButtonElements = filterButtonElements;
  }

  highlightActiveFilter(activeFilterType) {
    this._filterButtonElements.forEach((button) => {
      const isActive = button.dataset.filter === activeFilterType;
      button.classList.toggle('active', isActive);
    });
  }
}
