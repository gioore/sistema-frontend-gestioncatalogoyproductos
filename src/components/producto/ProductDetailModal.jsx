import { Modal } from '../ui/Modal.jsx'

export function ProductDetailModal({ producto, onCerrar }) {
  return (
    <Modal abierto={!!producto} titulo={producto?.nombre || 'Detalle'} onCerrar={onCerrar}>
      <p className="py-8 text-center text-slate-400">Vista de detalle (en construcción).</p>
    </Modal>
  )
}
