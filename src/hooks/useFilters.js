import { useMemo, useState } from 'react'
import {
  contarProductosCatalogo,
  extraerCategoriasDistinct,
  normalizarCategoria,
} from '../utils/categorias.js'

export function useFilters(productos) {
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('todas')
  const [soloOferta, setSoloOferta] = useState(false)

  const categoriasDistinct = useMemo(() => {
    return extraerCategoriasDistinct(productos)
  }, [productos])

  const cantidadTotalProductos = useMemo(
    () => contarProductosCatalogo(productos),
    [productos],
  )

  const filtrados = useMemo(() => {
    let lista = productos || []
    const termino = busqueda.trim().toLowerCase()

    if (termino) {
      lista = lista.filter((p) => (p.nombre || '').toLowerCase().includes(termino))
    }

    if (categoria !== 'todas') {
      lista = lista.filter((p) => normalizarCategoria(p.categoriaNombre) === categoria)
    }

    if (soloOferta) {
      lista = lista.filter((p) => p.enOferta === true)
    }

    return lista
  }, [productos, busqueda, categoria, soloOferta])

  return {
    busqueda,
    setBusqueda,
    categoria,
    setCategoria,
    soloOferta,
    setSoloOferta,
    categoriasDistinct,
    cantidadTotalProductos,
    filtrados,
  }
}
