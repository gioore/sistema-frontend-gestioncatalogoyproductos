function convertirCategoriaAtexto(valor) {
  if (valor == null) return ''
  return String(valor)
}

export function normalizarCategoria(texto) {
  const valor = convertirCategoriaAtexto(texto).trim()
  if (!valor) return ''

  return valor
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function obtenerEtiquetaCategoria(producto) {
  const valor = convertirCategoriaAtexto(producto?.categoriaNombre).trim()
  return valor
}

export function extraerCategoriasDistinct(productos) {
  const mapa = new Map()

  ;(Array.isArray(productos) ? productos : []).forEach((producto) => {
    const etiqueta = obtenerEtiquetaCategoria(producto)
    const clave = normalizarCategoria(etiqueta)

    if (!clave) return

    const categoriaActual = mapa.get(clave)

    if (categoriaActual) {
      categoriaActual.cantidad += 1
      return
    }

    mapa.set(clave, {
      clave,
      nombre: etiqueta,
      cantidad: 1,
      id: producto?.categoriaId ?? null,
    })
  })

  return Array.from(mapa.values()).sort((a, b) => a.clave.localeCompare(b.clave))
}

export function contarProductosCatalogo(productos) {
  return Array.isArray(productos) ? productos.length : 0
}
