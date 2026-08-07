import { ProductCard } from './ProductCard.jsx'

export function ProductList({ productos, onVer, onEliminar }) {
  const listaProductos = Array.isArray(productos) ? productos : []

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {listaProductos.map((producto) => (
        <ProductCard
          key={producto.id}
          producto={producto}
          onVer={onVer}
          onEliminar={onEliminar}
        />
      ))}
    </div>
  )
}
