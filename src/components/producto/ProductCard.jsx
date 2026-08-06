export function ProductCard({ producto }) {
  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="aspect-[3/2] w-full overflow-hidden bg-slate-100">
        <img
          src={producto?.imagen || ''}
          alt={producto?.nombre || 'Producto'}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-4">
        <p className="text-xs text-slate-500">{producto?.categoriaNombre}</p>
        <h3 className="mt-1 line-clamp-2 font-semibold text-slate-800">
          {producto?.nombre}
        </h3>
        <p className="mt-2 text-lg font-bold text-slate-900">
          {producto?.precio != null ? `Q${producto.precio}` : '—'}
        </p>
      </div>
    </article>
  )
}
