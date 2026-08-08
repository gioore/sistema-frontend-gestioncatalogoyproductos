import { Link } from 'react-router-dom'
import { Modal } from '../ui/Modal.jsx'
import { EmptyState } from '../ui/EmptyState.jsx'

function formatoPrecio(valor) {
  if (valor == null) return '—'
  return `Q${Number(valor).toFixed(2)}`
}

export function ProductDetailModal({ producto, onCerrar, onEliminar }) {
  const imagenFallback = 'https://placehold.co/600x400?text=Sin+imagen'
  const productoValido = producto?.id != null || Boolean(producto?.nombre)

  return (
    <Modal abierto={!!producto} titulo={producto?.nombre || 'Detalle'} onCerrar={onCerrar}>
      {productoValido ? (
        <div>
          <div className="aspect-[3/2] w-full overflow-hidden rounded-lg bg-slate-100">
            <img
              src={String(producto?.imagen ?? '').trim() || imagenFallback}
              alt={producto.nombre || 'Producto'}
              className="h-full w-full object-cover"
              onError={(evento) => {
                evento.currentTarget.onerror = null
                evento.currentTarget.src = imagenFallback
              }}
            />
          </div>

          <div className="mt-4 space-y-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
              {producto.categoriaNombre || 'Sin categoría'}
            </span>

            {producto.enOferta && producto.precioOferta != null ? (
              <div className="flex items-baseline gap-2">
                <span className="text-sm text-slate-400 line-through">
                  {formatoPrecio(producto.precio)}
                </span>
                <span className="text-xl font-bold text-blue-600">
                  {formatoPrecio(producto.precioOferta)}
                </span>
                <span className="rounded bg-red-100 px-1.5 py-0.5 text-xs font-semibold text-red-600">
                  Oferta
                </span>
              </div>
            ) : (
              <p className="text-xl font-bold text-slate-900">
                {formatoPrecio(producto.precio)}
              </p>
            )}

            <p className="text-sm text-slate-600">
              {producto.descripcion || 'Sin descripción.'}
            </p>

            <p className="text-xs text-slate-400">ID: {producto.id}</p>
          </div>

          <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={onCerrar}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Cerrar
            </button>
            <Link
              to={`/producto/${producto.id}/editar`}
              className="rounded-lg border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
            >
              Editar
            </Link>
            <button
              type="button"
              onClick={() => onEliminar(producto)}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
            >
              Eliminar
            </button>
          </div>
        </div>
      ) : (
        <EmptyState mensaje="No se encontró la información del producto." />
      )}
    </Modal>
  )
}