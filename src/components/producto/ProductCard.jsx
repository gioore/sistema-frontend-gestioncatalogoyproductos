import { useState } from 'react'
import { Link } from 'react-router-dom'

export function ProductCard({ producto, onVer, onEliminar }) {
  const [menuAbierto, setMenuAbierto] = useState(false)

  const cerrarMenu = () => setMenuAbierto(false)

  const opcion = (accion) => () => {
    cerrarMenu()
    accion()
  }

  return (
    <article className="relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <button
        type="button"
        className="flex flex-col text-left"
        onClick={() => onVer(producto)}
      >
        <div className="aspect-[3/2] w-full overflow-hidden bg-slate-100">
          <img
            src={producto?.imagen || ''}
            alt={producto?.nombre || 'Producto'}
            className="h-full w-full object-cover transition duration-300 hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col p-4">
          <p className="text-xs text-slate-500">{producto?.categoriaNombre}</p>
          <h3 className="mt-1 line-clamp-2 font-semibold text-slate-800">
            {producto?.nombre}
          </h3>
          <p className="mt-2 text-lg font-bold text-slate-900">
            {producto?.precio != null ? `Q${producto.precio}` : '—'}
          </p>
        </div>
      </button>

      <div className="absolute right-3 top-3">
        <button
          type="button"
          onClick={(evento) => {
            evento.stopPropagation()
            setMenuAbierto((v) => !v)
          }}
          className="rounded-full bg-white/90 p-1.5 text-slate-600 shadow-sm transition hover:bg-white hover:text-slate-900"
          aria-label="Acciones"
          aria-expanded={menuAbierto}
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>

        {menuAbierto && (
          <>
            <div className="fixed inset-0 z-10" onClick={cerrarMenu} aria-hidden="true"></div>
            <div className="absolute right-0 z-20 mt-1 w-40 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
              <button
                type="button"
                onClick={opcion(() => onVer(producto))}
                className="block w-full px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-50"
              >
                Ver detalle
              </button>
              <Link
                to={`/producto/${producto.id}/editar`}
                onClick={cerrarMenu}
                className="block w-full px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-50"
              >
                Editar
              </Link>
              <button
                type="button"
                onClick={opcion(() => onEliminar(producto))}
                className="block w-full px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50"
              >
                Eliminar
              </button>
            </div>
          </>
        )}
      </div>
    </article>
  )
}