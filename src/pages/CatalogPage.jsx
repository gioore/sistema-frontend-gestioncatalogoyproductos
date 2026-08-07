import { useState } from 'react'
import { useProductos } from '../context/ProductContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { useFilters } from '../hooks/useFilters.js'
import { CategoryMenu } from '../components/producto/CategoryMenu.jsx'
import { FilterControls } from '../components/producto/FilterControls.jsx'
import { ProductList } from '../components/producto/ProductList.jsx'
import { DeleteConfirmModal } from '../components/producto/DeleteConfirmModal.jsx'
import { ProductDetailModal } from '../components/producto/ProductDetailModal.jsx'
import { Spinner } from '../components/ui/Spinner.jsx'
import { ErrorMessage } from '../components/ui/ErrorMessage.jsx'
import { EmptyState } from '../components/ui/EmptyState.jsx'

export function CatalogPage() {
  const {
    productos,
    loading,
    error,
    refetch,
    eliminarProducto,
  } = useProductos()

  const { notify } = useToast()

  const {
    busqueda,
    setBusqueda,
    categoria,
    setCategoria,
    soloOferta,
    setSoloOferta,
    limpiarFiltros,
    filtrados,
    categoriasDistinct,
    cantidadResultados,
  } = useFilters(productos)

  const [productoParaEliminar, setProductoParaEliminar] = useState(null)
  const [productoParaVer, setProductoParaVer] = useState(null)
  const [eliminando, setEliminando] = useState(false)

  const confirmarEliminacion = async (producto) => {
    setEliminando(true)

    try {
      await eliminarProducto(producto.id)

      notify(
        'Producto eliminado correctamente.',
        'success',
      )

      setProductoParaEliminar(null)

      if (productoParaVer?.id === producto.id) {
        setProductoParaVer(null)
      }
    } catch (err) {
      notify(
        err?.response?.data?.message ||
          err?.message ||
          'No se pudo eliminar el producto.',
        'error',
      )
    } finally {
      setEliminando(false)
    }
  }

  const abrirEliminacion = (producto) => {
    setProductoParaVer(null)
    setProductoParaEliminar(producto)
  }

  if (loading) {
    return <Spinner texto="Cargando productos..." />
  }

  if (error) {
    return (
      <ErrorMessage
        mensaje={error}
        onReintentar={refetch}
      />
    )
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 px-6 py-8 text-white shadow-xl sm:px-10 sm:py-12">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-200 ring-1 ring-blue-400/30">
            CatálogoShop
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Catálogo de productos
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
            Consulta, administra y encuentra fácilmente los
            productos disponibles dentro del sistema.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="min-w-32 rounded-xl bg-white/10 px-4 py-3 backdrop-blur">
              <p className="text-2xl font-bold">
                {filtrados.length}
              </p>

              <p className="text-xs text-slate-300">
                Productos visibles
              </p>
            </div>

            <div className="min-w-32 rounded-xl bg-white/10 px-4 py-3 backdrop-blur">
              <p className="text-2xl font-bold">
                {categoriasDistinct.length}
              </p>

              <p className="text-xs text-slate-300">
                Categorías
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            Productos disponibles
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Selecciona un producto para consultar sus detalles.
          </p>
        </div>

        <div className="mb-4 grid gap-4">
          <FilterControls
            busqueda={busqueda}
            onBusquedaChange={setBusqueda}
            categoria={categoria}
            soloOferta={soloOferta}
            onSoloOfertaChange={setSoloOferta}
            onLimpiarFiltros={limpiarFiltros}
            cantidadResultados={cantidadResultados}
          />

          <CategoryMenu
            categorias={categoriasDistinct}
            categoriaSeleccionada={categoria}
            onCategoriaChange={setCategoria}
            totalProductos={productos.length}
          />
        </div>

        {filtrados.length === 0 ? (
          <EmptyState
            mensaje={
              productos.length === 0
                ? 'No hay productos que mostrar.'
                : 'No hay productos que coincidan con los filtros seleccionados.'
            }
          />
        ) : (
          <ProductList
            productos={filtrados}
            onVer={setProductoParaVer}
            onEliminar={abrirEliminacion}
          />
        )}
      </section>

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


