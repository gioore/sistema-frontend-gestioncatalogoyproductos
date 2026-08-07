import { Modal } from '../ui/Modal.jsx'

export function DeleteConfirmModal({ producto, onConfirmar, onCancelar, eliminando = false }) {
  return (
    <Modal abierto={!!producto} titulo="Confirmar eliminación" onCerrar={onCancelar}>
      <p className="text-sm text-slate-600">
        ¿Seguro que deseas eliminar el producto{' '}
        <span className="font-semibold text-slate-800">{producto?.nombre}</span>?
        Esta acción no se puede deshacer.
      </p>
      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancelar}
          disabled={eliminando}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={() => onConfirmar(producto)}
          disabled={eliminando}
          className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {eliminando && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"></span>
          )}
          Eliminar
        </button>
      </div>
    </Modal>
  )
}