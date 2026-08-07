export function FilterControls({
  busqueda,
  onBusquedaChange,
  categoria,
  soloOferta,
  onSoloOfertaChange,
  onLimpiarFiltros,
  cantidadResultados,
}) {
  const hayFiltrosActivos =
    busqueda.trim() !== '' || categoria !== 'todas' || soloOferta === true

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="grid gap-4 sm:grid-cols-2 lg:flex-1 lg:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              Buscar producto
            </span>
            <input
              type="search"
              value={busqueda}
              onChange={(evento) => onBusquedaChange(evento.target.value)}
              placeholder="Buscar por nombre"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </label>

          <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
            <input
              type="checkbox"
              checked={soloOferta}
              onChange={(evento) => onSoloOfertaChange(evento.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Solo productos en oferta</span>
          </label>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:justify-end">
          <div className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700" aria-live="polite">
            {cantidadResultados} productos encontrados
          </div>

          <button
            type="button"
            onClick={onLimpiarFiltros}
            disabled={!hayFiltrosActivos}
            className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Limpiar filtros
          </button>
        </div>
      </div>
    </section>
  )
}
