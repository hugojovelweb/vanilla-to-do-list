# vanilla-to-do-list (Refactorizado)
# Hugo Ernesto Jovel Hernandez Full Stack J-36

Refactorización aplicando **principios SOLID** y **Clean Code** sobre el proyecto
original de Kodigo: https://github.com/Kodigo-academic/vanilla-to-do-list

## Cómo ejecutar

```bash
npm install
npm run dev      # entorno de desarrollo
npm run build    # build de producción
```

## Estructura

```
src/
├── main.js               # Composition root (bootstrap + inyección de dependencias)
├── constants/             # Enums / valores constantes (evita magic strings)
├── models/                 # Entidades de dominio (Task)
├── utils/                  # Validación e IDs
├── repositories/           # Persistencia (StoragePort + adaptadores + TaskRepository)
├── services/                # Reglas de negocio (TaskService + estrategias de filtrado)
├── ui/                       # Renderers, cada uno con una única responsabilidad visual
└── controllers/              # TaskController: orquesta UI <-> servicio
```

## Principios SOLID aplicados

| Principio | Dónde |
|---|---|
| SRP | Task, TaskRepository, TaskService, cada Renderer, TaskController |
| OCP | `taskFilterStrategies.js` (patrón Strategy para filtros) |
| LSP | `LocalStorageAdapter` / `InMemoryStorageAdapter` implementan `StoragePort` |
| ISP | `StoragePort` expone solo `getItem`/`setItem` |
| DIP | `TaskRepository`/`TaskService` dependen de `StoragePort`, no de `localStorage` directamente |

Ver el informe completo `Refactorizacion-CleanCode-SOLID-HugoJovel-FSJ36.docx` para el
diagnóstico de code smells, la justificación detallada de cada principio aplicado y la
guía paso a paso de fork + commits atómicos.
