import pptxgen from 'pptxgenjs'

const pptx = new pptxgen()

pptx.defineLayout({ name: 'WIDE', width: 13.33, height: 7.5 })
pptx.layout = 'WIDE'
pptx.author = 'Equipo CatálogoShop'
pptx.title = 'CatálogoShop — Sistema de Gestión y Catálogo de Productos'

const COLORS = {
  fondo: 'F1F5F9',
  bandera: '0F172A',
  azul: '2563EB',
  verde: '059669',
  rojo: 'DC2626',
  titulo: '0F172A',
  texto: '334155',
  suave: '64748B',
  blanco: 'FFFFFF',
}

const W = 13.33
const H = 7.5

function cabecera(slide, numero, titulo) {
  slide.background = { color: COLORS.fondo }
  slide.addShape('rect', {
    x: 0, y: 0, w: W, h: 1.05, fill: { color: COLORS.bandera },
  })
  slide.addShape('rect', {
    x: 0, y: 1.05, w: W, h: 0.07, fill: { color: COLORS.azul },
  })
  slide.addText(`Diapositiva ${numero} de 4`, {
    x: 0.5, y: 0.12, w: 4, h: 0.3, fontSize: 11, color: COLORS.suave,
    fontFace: 'Calibri', italic: true,
  })
  slide.addText(titulo, {
    x: 0.5, y: 0.36, w: 10.5, h: 0.6, fontSize: 26, bold: true,
    color: COLORS.blanco, fontFace: 'Calibri',
  })
  slide.addText('CatálogoShop · Exposición', {
    x: 9.6, y: 7.12, w: 3.2, h: 0.3, fontSize: 9, color: COLORS.suave,
    align: 'right', italic: true,
  })
}

function bloque(slide, x, y, w, h, titulo, items, color = COLORS.azul) {
  slide.addShape('rect', {
    x, y, w, h, fill: { color: COLORS.blanco },
    line: { color: 'CBD5E1', width: 1 }, shadow: { type: 'outer', color: '000000', opacity: 0.08, blur: 6, offset: 2, angle: 90 },
  })
  slide.addText(titulo, {
    x: x + 0.2, y: y + 0.15, w: w - 0.4, h: 0.4, fontSize: 15, bold: true, color,
  })
  slide.addText(items.map((item) => `•  ${item}`).join('\n'), {
    x: x + 0.25, y: y + 0.65, w: w - 0.5, h: h - 0.85,
    fontSize: 11.5, color: COLORS.texto, lineSpacingMultiple: 1.15, valign: 'top',
  })
}

// ---------------- Diapositiva 1 ----------------
const s1 = pptx.addSlide()
cabecera(s1, 1, 'Presentación y Stack Tecnológico')

s1.addText('CatálogoShop — Sistema de Gestión y Catálogo de Productos', {
  x: 0.5, y: 1.35, w: 12.3, h: 0.5, fontSize: 20, bold: true, color: COLORS.titulo,
})

bloque(s1, 0.5, 2.0, 4.1, 4.7, 'Integrantes', [
  'Gerson Orellana — Líder / CRUD y despliegue',
  'Javier — Interfaz y UX (navbar, cabecera)',
  'Albino — Categorías DISTINCT y filtros',
  'Didhyer — Listado y grid responsive',
  'Keily — Detalle, integración y pruebas',
])

bloque(s1, 4.8, 2.0, 4.1, 4.7, 'JS → React + Vite', [
  'Componentes reutilizables y reactividad declarativa',
  'Ecosistema maduro y JSX',
  'Vite: HMR instantáneo y build ligero',
  'axios para peticiones HTTP',
  'react-router-dom (HashRouter)',
])

bloque(s1, 9.1, 2.0, 3.7, 4.7, 'CSS → Tailwind v4', [
  'Utility-first: clases en el JSX',
  'Responsive rápido sin CSS muerto',
  'Estilos consistentes en equipo',
  'Context para estado compartido',
])

// ---------------- Diapositiva 2 ----------------
const s2 = pptx.addSlide()
cabecera(s2, 2, 'Arquitectura y Solución Técnica')

bloque(s2, 0.5, 1.35, 6.1, 2.9, '1) Categorías dinámicas (DISTINCT)', [
  'normalizarCategoria(): trim + minúsculas + sin tildes (NFD)',
  'extraerCategoriasDistinct(): Map por clave normalizada',
  'Guarda { clave, nombre, cantidad, id } e incrementa cantidad',
  'Descarta vacíos y ordena por clave',
  'Por qué: el backend no expone categorías y trae datos inconsistentes',
])

bloque(s2, 6.8, 1.35, 6.0, 2.9, '2) Peticiones asíncronas y estado', [
  'productoService con axios (Content-Type: application/json)',
  'Un único GET al montar con async/await y try/catch/finally',
  'Estados loading / error / datos en el ProductContext',
  'agregar / actualizar / eliminar actualizan el estado en memoria',
  'Context compartido: sin prop-drilling entre listado, filtros y detalle',
])

bloque(s2, 0.5, 4.45, 12.3, 2.2, '3) Estructura y flujo', [
  'api/ (servicios) → context/ (estado global) → hooks/ + utils/ (filtros, DISTINCT) → components/ (layout, ui, producto) → pages/',
  'Delegación: el Frontend procesa el DISTINCT y los filtros combinados (nombre + categoría + oferta + limpiar) sin cargar al backend',
  'GitHub Pages con HashRouter para rutas SPA sin servidor',
])

// ---------------- Diapositiva 3 ----------------
const s3 = pptx.addSlide()
cabecera(s3, 3, 'Demostración en Vivo')

bloque(s3, 0.5, 1.35, 4.1, 5.5, 'Navegación y filtros', [
  'Catálogo → menú "⋯" → detalle',
  'Filtros combinados: búsqueda + oferta + categoría',
  'Botón "Limpiar filtros" (useFilters)',
  'Grid responsive y cards con precios (Didhyer)',
  'UI: navbar, cabecera, badges de oferta (Javier)',
  'Modal de detalle (Keily)',
], COLORS.verde)

bloque(s3, 4.8, 1.35, 8.0, 5.5, 'CRUD en tiempo real (Gerson)', [
  '1. CREAR (POST): "+ Nuevo producto" → formulario → guardar → toast de éxito',
  '2. EDITAR (PUT): menú "⋯" → "Editar" → formulario precargado → cambiar precio → guardar',
  '3. ELIMINAR (DELETE): "Eliminar" → modal de confirmación → confirmar → desaparece + toast',
  '4. El estado global se actualiza al instante (sin recargar la página)',
  'Todo contra BackService: https://backservicetest-….azurewebsites.net/api/producto',
], COLORS.rojo)

// ---------------- Diapositiva 4 ----------------
const s4 = pptx.addSlide()
cabecera(s4, 4, 'Justificación Técnica y Conclusiones')

bloque(s4, 0.5, 1.35, 6.1, 3.0, 'Frameworks vs JavaScript Vanilla', [
  'Componentes reutilizables y estado declarativo (menos código imperativo)',
  'Productividad y DX: HMR, ecosistema y tooling',
  'Manejo de errores asíncronos limpio y responsive ágil con Tailwind',
], COLORS.verde)

bloque(s4, 6.8, 1.35, 6.0, 3.0, 'Lecciones aprendidas y retos', [
  'Normalizar datos del backend (categorías inconsistentes y precioOferta null)',
  'Integrar 4 ramas/PRs en paralelo sin romper el trabajo ajeno',
  'Centralizar el estado para mantener coherencia entre módulos',
  'Deploy a GitHub Pages con HashRouter',
])

bloque(s4, 0.5, 4.55, 12.3, 2.3, 'Conclusión', [
  'Definir la arquitectura antes de codear evitó conflictos y duplicación',
  'El estado global centralizado (Context) hizo escalable el trabajo en equipo',
  'React + Tailwind aceleraron el desarrollo y mejoraron la UX frente a Vanilla',
])

await pptx.writeFile({ fileName: 'Presentacion-CatalogoShop.pptx' })
console.log('Presentacion-CatalogoShop.pptx generada.')
