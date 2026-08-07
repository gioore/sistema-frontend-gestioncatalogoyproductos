# TAREAS DEL EQUIPO — Sistema Frontend de Gestión y Catálogo de Productos

Distribución de trabajo sobre la estructura base (`feature/base`). Cada persona trabaja en **su propia rama** y abre un **Pull Request** a `main` al terminar.

> Regla: nadie hace push directo a `main`. Los PRs los revisa e integra el líder (Gerson).

---

## Gerson Orellana — Líder / CRUD (rama: `feature/crud`)

**Es el módulo más crítico, pero es responsabilidad del líder.**

- [ ] Crear producto (POST) con formulario y validaciones.
- [ ] Editar producto (PUT) con formulario prellenado.
- [ ] Eliminar producto (DELETE) con modal de confirmación.
- [ ] Formularios reutilizables (`ProductForm.jsx`) para crear y editar.
- [ ] Estados de carga y error en cada operación del CRUD.
- [ ] Mensaje visual de éxito/error tras cada operación.
- [ ] Integrar y revisar los PRs del equipo (resolver conflictos).

**Criterio de aceptación:** crear, editar y eliminar productos desde el navegador sin recargar la página (el estado global se actualiza en vivo).

---

## Albino — Filtros dinámicos y menú de categorías (rama: `feature/filtros`) ⚠️ DIFÍCIL

**Módulo con la lógica más compleja del proyecto.**

- [ ] Extraer categorías únicas (DISTINCT) a partir de la lista completa de productos.
- [ ] Normalizar nombres de categorías (trim, minúsculas, sin tildes) y descartar vacíos.
- [ ] Construir el **menú dinámico de categorías** (`CategoryMenu.jsx`).
- [ ] Búsqueda reactiva por nombre en tiempo real.
- [ ] Filtro por categoría desde el menú.
- [ ] Filtro de "productos en oferta".
- [ ] **Combinar filtros simultáneos** (nombre + categoría + oferta).
- [ ] Botón para limpiar todos los filtros.
- [ ] Indicar cuántos productos muestra cada filtro.

**Pista:** ya existe `src/hooks/useFilters.js` y `src/utils/categorias.js` como base; refínelos y conéctelos a la UI. Usar `categoriaNombre` normalizado como clave (los datos de la API tienen "Comida Rápida" y "Comida Rapida" que son la misma categoría).

**Criterio de aceptación:** el catálogo se filtra al instante combinando todos los criterios y el menú de categorías se genera solo.

---

## Javier — Interfaz y experiencia de usuario (rama: `feature/ui`) ⚠️ DIFÍCIL

**El módulo con mayor esfuerzo visual; es lo que más evalúa la rúbrica.**

- [ ] Diseño **responsive** (móvil, tablet, escritorio) con Tailwind.
- [ ] Navbar y Footer profesionales (estilizar los actuales).
- [ ] Estilizar `ProductCard`, `ProductList`, formularios y modales.
- [ ] Etiqueta visual "En Oferta" (badge de descuento).
- [ ] Mostrar **precio original tachado** y **precio de oferta resaltado** cuando `enOferta` y `precioOferta` no sean null.
- [ ] Animaciones suaves (hover en cards, transiciones, entrada de modales).
- [ ] Estados de carga (spinner), vacío y error con buena estética.
- [ ] Tipografía y paleta de colores coherente.

**Criterio de aceptación:** la app se ve profesional y funciona bien en celular.

---

## Didhyer — Listado de productos (rama: `feature/listado`)

- [ ] Consumir el estado global (GET) y mostrar el listado.
- [ ] Crear/mejorar `ProductCard` (imagen, nombre, categoría, precio).
- [ ] `ProductList` con grid adaptativo.
- [ ] Estados de carga (spinner).
- [ ] Mensaje cuando no existen productos (`EmptyState`).
- [ ] Manejo de errores de conexión (`ErrorMessage` + reintentar).

**Criterio de aceptación:** el catálogo carga con spinner, muestra las tarjetas y avisa correctamente ante errores o listas vacías.

---

## Keily — Detalle, integración, pruebas y presentación (rama: `feature/detalle`)

> Nota: Gerson dejó un **`ProductDetailModal` funcional básico** (abre al hacer click en la tarjeta, muestra info/precio/oferta y acciones Editar/Eliminar) como parte del CRUD. Tu trabajo aquí es **mejorarlo y completar** el resto.

- [ ] Mejorar el modal de detalle: más info, mejor layout, transiciones (apoyarte en la UI de Javier).
- [ ] Conectar el **GET por ID** (`getProductoById` en `api/productoService.js`) para el detalle cuando convenga.
- [ ] Integrar los módulos de todos (probar el flujo completo).
- [ ] Pruebas funcionales del CRUD, filtros y detalle.
- [ ] Corregir errores de integración.
- [ ] README completo y documentación.
- [ ] Diapositivas (máx. 4) para la exposición.
- [ ] Apoyar la demostración en vivo.

**Criterio de aceptación:** el detalle de un producto se abre con su información completa y el proyecto funciona integrado de punta a punta.

---

## Orden de integración sugerido

1. `feature/base` → base (Gerson)
2. `feature/listado` → Didhyer (necesario para ver algo)
3. `feature/filtros` → Albino (depende del listado)
4. `feature/detalle` → Keily
5. `feature/ui` → Javier (estiliza sobre todo lo demás)
6. `feature/crud` → Gerson (puede ir en paralelo con los demás)
