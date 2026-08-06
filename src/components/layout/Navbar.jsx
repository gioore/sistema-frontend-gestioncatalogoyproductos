import { Link } from 'react-router-dom'

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-lg font-bold text-slate-900">
          Catálogo<span className="text-blue-600">Shop</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            to="/producto/nuevo"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            + Nuevo producto
          </Link>
        </div>
      </nav>
    </header>
  )
}
