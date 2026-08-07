import { Link } from 'react-router-dom'

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-700 bg-slate-900 shadow-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="group flex items-center gap-3"
          aria-label="Ir al catálogo"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md transition group-hover:scale-105 group-hover:bg-blue-500">
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 6h18" />
              <path d="M5 6l1 14h12l1-14" />
              <path d="M9 10v6" />
              <path d="M15 10v6" />
              <path d="M8 6l1-3h6l1 3" />
            </svg>
          </div>

          <div>
            <p className="text-lg font-bold tracking-tight text-white">
              Catálogo<span className="text-blue-400">Shop</span>
            </p>
            <p className="hidden text-xs text-slate-400 sm:block">
              Gestión de productos
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white sm:block"
          >
            Catálogo
          </Link>

          <Link
            to="/producto/nuevo"
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-lg sm:px-4"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>

            <span className="hidden sm:inline">Nuevo producto</span>
            <span className="sm:hidden">Nuevo</span>
          </Link>
        </div>
      </nav>
    </header>
  )
}
