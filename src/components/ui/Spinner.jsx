export function Spinner({ texto = 'Cargando...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16" role="status">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600"></div>
      <p className="text-sm text-slate-500">{texto}</p>
    </div>
  )
}
