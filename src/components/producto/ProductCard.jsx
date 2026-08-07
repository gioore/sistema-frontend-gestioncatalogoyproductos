import { Link } from 'react-router-dom'

export function ProductCard({ producto, onEliminar }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="aspect-[3/2] w-full overflow-hidden bg-slate-100">
        <img
          src={producto?.imagen || ''}
          alt={producto?.nombre || 'Producto'}
          className="h-full w-full object-cover"
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
        <div className="mt-4 flex gap-2">
          <Link
            to={`/producto/${producto.id}/editar`}
            className="flex-1 rounded-lg border border-slate-300 px-3 py-1.5 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Editar
          </Link>
          <button
            type="button"
            onClick={() => onEliminar(producto)}
            className="flex-1 rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      </div>
    </article>
  )
}