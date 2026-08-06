export function normalizarCategoria(texto) {
  if (!texto) return ''
  return texto
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export function extraerCategoriasDistinct(productos) {
  const mapa = new Map()

  productos.forEach((p) => {
    const nombre = p?.categoriaNombre?.trim()
    const clave = normalizarCategoria(nombre)

    if (!clave) return

    if (!mapa.has(clave)) {
      mapa.set(clave, {
        id: p.categoriaId,
        nombre: nombre,
        clave: clave,
      })
    }
  })

  return Array.from(mapa.values()).sort((a, b) =>
    a.nombre.localeCompare(b.nombre),
  )
}