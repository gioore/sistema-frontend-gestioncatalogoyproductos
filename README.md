# CatálogoShop — Sistema Frontend de Gestión y Catálogo de Productos

Frontend construido con **React + Vite + Tailwind CSS** que consume el servicio **BackService** para listar, consultar, crear, editar y eliminar productos, con filtros dinámicos y diseño responsive.

## Requisitos previos

- **Node.js** v18 o superior (probado con Node 24).
- Cuenta de **GitHub** y git configurado.

## Instalación y puesta en marcha

1. Clonar el repositorio:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd sistema-frontend-gestioncatalogoyproductos
   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. Abrir la URL que muestra la consola (normalmente `http://localhost:5173`).

### Otros comandos útiles

| Comando           | Descripción                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Servidor de desarrollo (con HMR)     |
| `npm run build`   | Compilación de producción            |
| `npm run preview` | Previsualizar la compilación         |
| `npm run lint`    | Verificación de código con oxlint    |

## Configuración de la API

La URL base del servicio se define en un solo lugar:

- Archivo: `src/config/api.js`
- Constante: `BASE_URL`

```js
export const BASE_URL =
  'https://backservicetest-g8emcvdff0fqe2b8.canadacentral-01.azurewebsites.net/api/producto'
```

Todos los servicios (`src/api/productoService.js`) usan Axios con `Content-Type: application/json`.

## Estructura del proyecto

```
src/
├─ api/productoService.js        → Capa de servicios (getAll, getById, create, update, remove)
├─ config/api.js                 → URL base de la API
├─ context/ProductContext.jsx    → Estado global de productos (fetch único + acciones CRUD)
├─ hooks/useFilters.js           → Filtros combinados (búsqueda, categoría, oferta)
├─ utils/categorias.js           → Categorías DISTINCT normalizadas
├─ components/
│  ├─ layout/    Navbar.jsx, Footer.jsx
│  ├─ ui/        Modal.jsx, Spinner.jsx, EmptyState.jsx, ErrorMessage.jsx
│  └─ producto/  ProductCard.jsx, ProductList.jsx, ProductForm.jsx,
│                DeleteConfirmModal.jsx, ProductDetailModal.jsx
├─ pages/        CatalogPage.jsx, NotFoundPage.jsx
├─ App.jsx                       → Rutas de la aplicación
└─ main.jsx                      → Punto de entrada (BrowserRouter + ProductProvider)
```

## Flujo de trabajo con Git

Cada integrante trabaja en **su propia rama** y al terminar una funcionalidad abre un **Pull Request** hacia `main`.

```bash
# Desde main actualizado:
git checkout -b feature/nombre-modulo
# ... trabajar ...
git add .
git commit -m "feat: descripción breve"
git push origin feature/nombre-modulo
```

Ramas sugeridas:

- `feature/base` — estructura del proyecto (Gerson)
- `feature/crud` — CRUD completo (Gerson)
- `feature/listado` — listado de productos (Albino)
- `feature/filtros` — filtros y categorías (Didhyer)
- `feature/ui` — interfaz y UX (Javier)
- `feature/detalle` — detalle e integración (Keily)

> Reglas: no hacer `push` directo a `main`; los PRs los revisa el líder del equipo.

## Datos de referencia (API)

Formato del objeto Producto:

```json
{
  "id": 101,
  "nombre": "Auriculares Bluetooth",
  "descripcion": "Auriculares inalámbricos con cancelación de ruido.",
  "precio": 45.99,
  "enOferta": true,
  "precioOferta": 35.99,
  "imagen": "https://placehold.co/300x200?text=Auriculares",
  "categoriaId": 1,
  "categoriaNombre": "Electrónica"
}
```

## Integrantes

- Gerson Orellana — Líder del proyecto / CRUD
- Albino — Listado de productos
- Didhyer — Filtros y procesamiento de datos
- Javier — Interfaz y experiencia de usuario
- Keily — Vista de detalle e integración
