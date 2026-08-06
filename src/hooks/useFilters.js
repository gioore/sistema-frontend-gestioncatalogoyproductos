import { useMemo, useState } from 'react'
import { normalizarCategoria } from '../utils/categorias.js'

export function useFilters(productos) {
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('todas')
  const [soloOferta, setSoloOferta] = useState(false)

  const categoriasDistinct = useMemo(() => {
    const mapa = new Map()
    ;(productos || []).forEach((p) => {
      const nombre = p?.categoriaNombre?.trim()
      const clave = normalizarCategoria(nombre)
      if (!clave) return
      if (!mapa.has(clave)) {
        mapa.set(clave, { id: p.categoriaId, nombre, clave })
      }
    })
    return Array.from(mapa.values()).sort((a, b) => a.nombre.localeCompare(b.nombre))
  }, [productos])

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
    categoriasDistinct: categoriasDistinct,
    filtrados,
  }
}