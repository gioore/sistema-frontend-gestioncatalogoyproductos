import { useState } from 'react'
import { useProductos } from '../context/ProductContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { useFilters } from '../hooks/useFilters.js'
import { ProductList } from '../components/producto/ProductList.jsx'
import { DeleteConfirmModal } from '../components/producto/DeleteConfirmModal.jsx'
import { ProductDetailModal } from '../components/producto/ProductDetailModal.jsx'
import { Spinner } from '../components/ui/Spinner.jsx'
import { ErrorMessage } from '../components/ui/ErrorMessage.jsx'
import { EmptyState } from '../components/ui/EmptyState.jsx'

export function CatalogPage() {
  const { productos, loading, error, refetch, eliminarProducto } = useProductos()
  const { notify } = useToast()
  const { filtrados, categoriasDistinct } = useFilters(productos)

  const [productoParaEliminar, setProductoParaEliminar] = useState(null)
  const [productoParaVer, setProductoParaVer] = useState(null)
  const [eliminando, setEliminando] = useState(false)

  const confirmarEliminacion = async (producto) => {
    setEliminando(true)
    try {
      await eliminarProducto(producto.id)
      notify('Producto eliminado correctamente.', 'success')
      setProductoParaEliminar(null)
      if (productoParaVer?.id === producto.id) setProductoParaVer(null)
    } catch (err) {
      notify(err?.response?.data?.message || err?.message || 'No se pudo eliminar el producto.', 'error')
    } finally {
      setEliminando(false)
    }
  }

  const abrirEliminacion = (producto) => {
    setProductoParaVer(null)
    setProductoParaEliminar(producto)
  }

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
        <ProductList
          productos={filtrados}
          onVer={setProductoParaVer}
          onEliminar={abrirEliminacion}
        />
      )}

      <ProductDetailModal
        producto={productoParaVer}
        onCerrar={() => setProductoParaVer(null)}
        onEliminar={abrirEliminacion}
      />

      <DeleteConfirmModal
        producto={productoParaEliminar}
        onCancelar={() => setProductoParaEliminar(null)}
        onConfirmar={confirmarEliminacion}
        eliminando={eliminando}
      />
    </main>
  )
}