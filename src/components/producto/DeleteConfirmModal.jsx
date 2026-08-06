import { Modal } from '../ui/Modal.jsx'

export function DeleteConfirmModal({ producto, onConfirmar, onCancelar }) {
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
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={() => onConfirmar(producto)}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
        >
          Eliminar
        </button>
      </div>
    </Modal>
  )
}
