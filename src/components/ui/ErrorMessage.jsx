export function ErrorMessage({ mensaje, onReintentar }) {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <p className="text-lg font-semibold text-red-600">Algo salió mal</p>
      <p className="max-w-md text-sm text-slate-600">{mensaje}</p>
      {onReintentar && (
        <button
          type="button"
          onClick={onReintentar}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Reintentar
        </button>
      )}
    </div>
  )
}
