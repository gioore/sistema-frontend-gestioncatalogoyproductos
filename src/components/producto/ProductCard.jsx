import { Link } from 'react-router-dom'

export function ProductCard({ producto, onVer, onEliminar }) {
  const formatearPrecio = (valor) => {
    const numero = Number(valor)

    if (!Number.isFinite(numero)) {
      return '—'
    }

    return `Q${numero.toFixed(2)}`
  }

  const tieneOferta =
    Boolean(producto?.enOferta) &&
    producto?.precioOferta !== null &&
    producto?.precioOferta !== undefined

  const imagenProducto =
    producto?.imagen ||
    'https://placehold.co/600x400?text=Sin+imagen'

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
      <button
        type="button"
        onClick={() => onVer(producto)}
        className="relative block w-full overflow-hidden bg-slate-100 text-left"
        aria-label={`Ver detalles de ${producto?.nombre || 'producto'}`}
      >
        <div className="aspect-[4/3] w-full overflow-hidden">
          <img
            src={imagenProducto}
            alt={producto?.nombre || 'Producto'}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            onError={(evento) => {
              evento.currentTarget.onerror = null
              evento.currentTarget.src =
                'https://placehold.co/600x400?text=Sin+imagen'
            }}
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />

        {tieneOferta && (
          <span className="absolute left-3 top-3 rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-md">
            Oferta
          </span>
        )}

        <span className="absolute bottom-3 right-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur">
          Ver detalle
        </span>
      </button>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3">
          <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
            {producto?.categoriaNombre || 'Sin categoría'}
          </span>
        </div>

        <h3 className="line-clamp-2 text-lg font-bold leading-6 text-slate-900">
          {producto?.nombre || 'Producto sin nombre'}
        </h3>

        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500">
          {producto?.descripcion ||
            'Este producto no tiene una descripción disponible.'}
        </p>

        <div className="mt-5 flex flex-1 items-end">
          {tieneOferta ? (
            <div>
              <p className="text-sm text-slate-400 line-through">
                {formatearPrecio(producto?.precio)}
              </p>

              <p className="text-2xl font-bold text-emerald-600">
                {formatearPrecio(producto?.precioOferta)}
              </p>
            </div>
          ) : (
            <p className="text-2xl font-bold text-slate-900">
              {formatearPrecio(producto?.precio)}
            </p>
          )}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={() => onVer(producto)}
            className="rounded-xl bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Ver producto
          </button>

          <Link
            to={`/producto/${producto.id}/editar`}
            className="rounded-xl border border-slate-300 px-3 py-2.5 text-center text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
          >
            Editar
          </Link>

          <button
            type="button"
            onClick={() => onEliminar(producto)}
            className="col-span-2 rounded-xl px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 hover:text-red-700"
          >
            Eliminar producto
          </button>
        </div>
      </div>
    </article>
  )
}
