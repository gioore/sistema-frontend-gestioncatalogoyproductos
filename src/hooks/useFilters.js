import { useCallback, useMemo, useState } from 'react'
import {
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

  const limpiarFiltros = useCallback(() => {
    setBusqueda('')
    setCategoria('todas')
    setSoloOferta(false)
  }, [])

  const filtrados = useMemo(() => {
    let lista = Array.isArray(productos) ? productos : []
    const termino = String(busqueda ?? '').trim().toLowerCase()

    if (termino) {
      lista = lista.filter((producto) =>
        String(producto?.nombre ?? '')
          .trim()
          .toLowerCase()
          .includes(termino),
      )
    }

    if (categoria !== 'todas') {
      lista = lista.filter(
        (producto) => normalizarCategoria(producto?.categoriaNombre) === categoria,
      )
    }

    if (soloOferta) {
      lista = lista.filter((producto) => producto?.enOferta === true)
    }

    return lista
  }, [productos, busqueda, categoria, soloOferta])

  const cantidadResultados = useMemo(() => filtrados.length, [filtrados])

  return {
    busqueda,
    setBusqueda,
    categoria,
    setCategoria,
    soloOferta,
    setSoloOferta,
    categoriasDistinct,
    limpiarFiltros,
    filtrados,
    cantidadResultados,
  }
}
