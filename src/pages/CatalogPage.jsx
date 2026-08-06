import { useProductos } from '../context/ProductContext.jsx'
import { useFilters } from '../hooks/useFilters.js'
import { ProductList } from '../components/producto/ProductList.jsx'
import { Spinner } from '../components/ui/Spinner.jsx'
import { ErrorMessage } from '../components/ui/ErrorMessage.jsx'
import { EmptyState } from '../components/ui/EmptyState.jsx'

export function CatalogPage() {
  const { productos, loading, error, refetch } = useProductos()
  const { filtrados, categoriasDistinct } = useFilters(productos)

  if (loading) return <Spinner texto="Cargando productos..." />

  if (error) return <ErrorMessage mensaje={error} onReintentar={refetch} />

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900">Catálogo de productos</h1>

      <p className="mt-2 text-sm text-slate-500">
        {categoriasDistinct.length} categorías · {filtrados.length} productos
      </p>

      {filtrados.length === 0 ? (
        <EmptyState />
      ) : (
        <ProductList productos={filtrados} />
      )}
    </main>
  )
}