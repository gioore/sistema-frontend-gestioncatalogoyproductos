export function CategoryMenu({
  categorias,
  categoriaSeleccionada,
  onCategoriaChange,
  totalProductos,
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Categorías
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Filtra por categoría con conteo total del catálogo.
          </p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {totalProductos} productos
        </span>
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Listado de categorías">
        <button
          type="button"
          onClick={() => onCategoriaChange('todas')}
          aria-pressed={categoriaSeleccionada === 'todas'}
          className={`rounded-full px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            categoriaSeleccionada === 'todas'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          All ({totalProductos})
        </button>

        {categorias.map((categoria) => {
          const activa = categoriaSeleccionada === categoria.clave

          return (
            <button
              key={categoria.clave}
              type="button"
              onClick={() => onCategoriaChange(categoria.clave)}
              aria-pressed={activa}
              className={`rounded-full px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                activa
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {categoria.nombre} ({categoria.cantidad})
            </button>
          )
        })}
      </div>
    </section>
  )
}
