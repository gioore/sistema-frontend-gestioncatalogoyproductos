# Presentación — CatálogoShop (Sistema Frontend de Gestión y Catálogo de Productos)

> **Formato exigido:** máximo 10–12 min de exposición + 3–5 min de preguntas.
> **Estructura:** 4 diapositivas (se evalúa el cumplimiento estricto).
> **Quién expone:** Gerson presenta Stack, Arquitectura y el CRUD del live demo; el resto del equipo hace filtros/detalle (D3) y la justificación (D4).

---

## Diapositiva 1 — Presentación y Stack Tecnológico (≈2 min) — expone: Gerson

**Integrantes**
- Gerson Orellana — Líder / CRUD completo y despliegue.
- Javier — Interfaz y experiencia de usuario (navbar, cabecera del catálogo).
- Albino — Categorías dinámicas (DISTINCT) y filtros.
- Didhyer — Listado de productos y grid responsive.
- Keily — Detalle, integración, pruebas y documentación.

**Framework de JS → React (con Vite)**
Ventajas: componentes reutilizables, reactividad declarativa, ecosistema maduro y JSX. Elegimos **Vite** por su HMR instantáneo y builds ligeros.

**Framework de CSS → Tailwind CSS v4**
Ventajas: enfoque *utility-first* (clases dentro del JSX), responsive rápido, sin CSS muerto. Facilitó el trabajo en paralelo con estilos consistentes entre integrantes.

**Adicionales**
- **axios** → peticiones HTTP.
- **react-router-dom** → enrutado con `HashRouter` (requerido por GitHub Pages).
- **Context** → estado compartido de productos.

---

## Diapositiva 2 — Arquitectura y Solución Técnica (≈3 min) — expone: Gerson

**1) Categorías dinámicas (DISTINCT)** — `src/utils/categorias.js`
1. `normalizarCategoria()`: `trim()`, minúsculas y quita tildes (`.normalize('NFD')` + elimina `[\u0300-\u036f]`).
2. `extraerCategoriasDistinct(productos)`: recorre el arreglo con un `Map` claveado por la **clave normalizada**; por cada producto guarda `{ clave, nombre, cantidad, id }` e **incrementa `cantidad`**; descarta vacíos y ordena por clave.
- *Motivo:* el backend no expone categorías y trae datos inconsistentes ("Comida Rápida" vs "Comida Rápida", nombres vacíos `""`). Así se deduplican.

**2) Peticiones asíncronas y estado** — `productoService.js` + `ProductContext.jsx`
- Capa de servicios con axios y `Content-Type: application/json`: `getProductos`, `getProductoById`, `crearProducto`, `actualizarProducto`, `eliminarProducto`.
- `useProductos` hace **un único GET al montar** (`async/await`) y expone `loading` / `error` / datos con `try/catch/finally`.
- `agregarProducto`, `actualizar`, `eliminar` actualizan el **estado global en memoria** → la UI reacciona sin recargar.
- Estado compartido por **Context**: sin *prop-drilling* entre listado, filtros y detalle.

**3) Estructura**
`api/ → context/ → hooks/+utils/ → components/ → pages/`

---

## Diapositiva 3 — Demostración en Vivo (≈4–5 min) — CRUD: Gerson · filtros/detalle: resto

1. **Navegación:** catálogo → menú "⋯" de la tarjeta → **detalle** del producto.
2. **Filtros combinados** (Albino): búsqueda por nombre + "solo en oferta" + categoría + "Limpiar filtros" (`useFilters`).
3. **CRUD en vivo (Gerson, contra BackService):**
   - **Crear (POST):** "+ Nuevo producto" → guardar → toast de éxito.
   - **Editar (PUT):** menú → "Editar" → cambiar precio → guardar.
   - **Eliminar (DELETE):** menú/detalle → "Eliminar" → confirmar en modal → desaparece + toast.
4. **Listado y grid (Didhyer):** tarjetas responsive y cards con oferta/precios.
5. **UI (Javier):** navbar, cabecera, badges de oferta.
6. **Detalle (Keily):** modal de detalle, GET por id.

---

## Diapositiva 4 — Justificación Técnica y Conclusiones (≈2 min) — expone: resto del equipo

**Frameworks vs JavaScript Vanilla**
- Componentes reutilizables y estado declarativo (menos código imperativo).
- Productividad y DX (HMR, ecosistema, tooling).
- Styling responsive ágil con Tailwind y manejo de errores asíncronos limpio.

**Lecciones aprendidas y retos superados**
- Normalización de datos del backend (categorías inconsistentes y `precioOferta: null`).
- Integración de 4 ramas/PRs en paralelo sin romper el trabajo ajeno (conflicto de `ProductCard` resuelto).
- Estado compartido centralizado para mantener coherencia entre módulos.
- Deploy a GitHub Pages usando `HashRouter` (rutas SPA sin servidor).

**Conclusión:** definir la arquitectura antes de codear y centralizar el estado hicieron escalable y sin fricción el trabajo del equipo.

---

## Repartición de tiempos sugerida

| Diapositiva | Quién | Min |
|---|---|---|
| 1 — Stack | Gerson | ~2 |
| 2 — Arquitectura | Gerson | ~3 |
| 3 — Demo | Gerson (solo CRUD) + resto (filtros/detalle/UI) | ~4–5 |
| 4 — Conclusiones | Resto del equipo | ~2 |
| **Total** | — | **10–12** |

> Archivo: `DIAPOSITIVAS.md`. Presentación editable: `Presentacion-CatalogoShop.pptx`.