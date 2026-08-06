import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  actualizarProducto,
  crearProducto,
  eliminarProducto,
  getProductos,
} from '../api/productoService.js'

const ProductContext = createContext(null)

export function ProductProvider({ children }) {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getProductos()
      setProductos(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err?.message || 'No se pudo conectar con el servidor.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refetch()
  }, [refetch])

  const agregarProducto = useCallback(async (producto) => {
    const creado = await crearProducto(producto)
    setProductos((prev) => [creado, ...prev])
    return creado
  }, [])

  const actualizar = useCallback(async (id, producto) => {
    const actualizado = await actualizarProducto(id, producto)
    setProductos((prev) => prev.map((p) => (p.id === id ? actualizado : p)))
    return actualizado
  }, [])

  const eliminar = useCallback(async (id) => {
    await eliminarProducto(id)
    setProductos((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const value = useMemo(
    () => ({
      productos,
      loading,
      error,
      refetch,
      agregarProducto,
      actualizarProducto: actualizar,
      eliminarProducto: eliminar,
    }),
    [productos, loading, error, refetch, agregarProducto, actualizar, eliminar],
  )

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}

export function useProductos() {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProductos debe usarse dentro de un ProductProvider')
  }
  return context
}
