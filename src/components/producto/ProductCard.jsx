import { useState } from 'react'
import { Link } from 'react-router-dom'

export function ProductCard({ producto, onVer, onEliminar }) {
  const [menuAbierto, setMenuAbierto] = useState(false)

  const cerrarMenu = () => setMenuAbierto(false)

  const imagenFallback = 'https://placehold.co/600x400?text=Sin+imagen'
  const productoId = producto?.id
  const nombreProducto = String(producto?.nombre ?? '').trim() || 'Producto sin nombre'
  const categoriaProducto =
    String(producto?.categoriaNombre ?? '').trim() || 'Sin categoría'
  const descripcionProducto =
    String(producto?.descripcion ?? '').trim() ||
    'Este producto no tiene una descripción disponible.'
  const puedeEditar = productoId !== null && productoId !== undefined

  const formatearPrecio = (valor) => {
    if (valor === null || valor === undefined || valor === '') {
      return '—'
    }

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
    String(producto?.imagen ?? '').trim() || imagenFallback

  const verProducto = () => {
    cerrarMenu()
    onVer?.(producto)
  }

  const elegirOpcion = (accion) => () => {
    cerrarMenu()
    accion()
  }

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
      <button
        type="button"
        onClick={verProducto}
        className="relative block w-full overflow-hidden bg-slate-100 text-left"
        aria-label={`Ver detalles de ${nombreProducto}`}
      >
        <div className="aspect-[4/3] w-full overflow-hidden">
          <img
            src={imagenProducto}
            alt={nombreProducto}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            onError={(evento) => {
              evento.currentTarget.onerror = null
              evento.currentTarget.src = imagenFallback
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

      <div className="absolute right-3 top-3">
        <button
          type="button"
          onClick={(evento) => {
            evento.stopPropagation()
            setMenuAbierto((v) => !v)
          }}
          className="rounded-full bg-white/90 p-1.5 text-slate-600 shadow-sm transition hover:bg-white hover:text-slate-900"
          aria-label="Acciones del producto"
          aria-expanded={menuAbierto}
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>

        {menuAbierto && (
          <>
            <div className="fixed inset-0 z-10" onClick={cerrarMenu} aria-hidden="true"></div>
            <div className="absolute right-0 z-20 mt-1 w-44 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
              <button
                type="button"
                onClick={elegirOpcion(() => onVer?.(producto))}
                className="block w-full px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-50"
              >
                Ver detalle
              </button>
              {puedeEditar ? (
                <Link
                  to={`/producto/${productoId}/editar`}
                  onClick={cerrarMenu}
                  className="block w-full px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-50"
                >
                  Editar
                </Link>
              ) : (
                <button
                  type="button"
                  disabled
                  className="block w-full px-3 py-2 text-left text-sm text-slate-400"
                >
                  Editar
                </button>
              )}
              <button
                type="button"
                onClick={elegirOpcion(() => onEliminar?.(producto))}
                className="block w-full px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50"
              >
                Eliminar
              </button>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3">
          <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
            {categoriaProducto}
          </span>
        </div>

        <h3 className="line-clamp-2 text-lg font-bold leading-6 text-slate-900">
          {nombreProducto}
        </h3>

        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500">
          {descripcionProducto}
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
      </div>
    </article>
  )
}