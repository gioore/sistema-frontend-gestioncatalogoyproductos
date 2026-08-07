import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const contador = useRef(0)

  const remover = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const notify = useCallback(
    (mensaje, tipo = 'info', duracion = 3500) => {
      const id = ++contador.current
      setToasts((prev) => [...prev, { id, mensaje, tipo }])
      setTimeout(() => remover(id), duracion)
    },
    [remover],
  )

  const value = useMemo(() => ({ notify }), [notify])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex w-80 max-w-[calc(100vw-2rem)] flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={`pointer-events-auto flex items-start gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white shadow-lg ${
              t.tipo === 'error'
                ? 'bg-red-600'
                : t.tipo === 'success'
                  ? 'bg-emerald-600'
                  : 'bg-slate-700'
            }`}
          >
            <span className="flex-1">{t.mensaje}</span>
            <button
              type="button"
              onClick={() => remover(t.id)}
              className="text-white/70 transition hover:text-white"
              aria-label="Cerrar"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast debe usarse dentro de un ToastProvider')
  }
  return context
}