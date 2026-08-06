import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <main className="flex flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <p className="text-6xl font-black text-slate-300">404</p>
      <p className="text-lg font-semibold text-slate-700">Página no encontrada</p>
      <Link to="/" className="text-sm font-medium text-blue-600 hover:underline">
        Volver al catálogo
      </Link>
    </main>
  )
}