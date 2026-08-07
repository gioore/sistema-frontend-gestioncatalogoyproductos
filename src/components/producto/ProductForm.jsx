import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useProductos } from '../../context/ProductContext.jsx'
import { useToast } from '../../context/ToastContext.jsx'
import { extraerCategoriasDistinct } from '../../utils/categorias.js'
import { Spinner } from '../ui/Spinner.jsx'

const estadoVacio = () => ({
  nombre: '',
  descripcion: '',
  precio: '',
  enOferta: false,
  precioOferta: '',
  imagen: '',
  categoriaNombre: '',
  categoriaId: '',
})

export function ProductForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const esEdicion = Boolean(id)

  const { productos, loading, agregarProducto, actualizarProducto } = useProductos()
  const { notify } = useToast()

  const producto = useMemo(
    () => productos.find((p) => String(p.id) === String(id)),
    [productos, id],
  )

  const categorias = useMemo(() => extraerCategoriasDistinct(productos), [productos])

  const [form, setForm] = useState(estadoVacio)
  const [errores, setErrores] = useState({})
  const [enviando, setEnviando] = useState(false)

  useEffect(() => {
    if (!esEdicion) return
    if (!producto) return
    setForm({
      nombre: producto.nombre || '',
      descripcion: producto.descripcion || '',
      imagen: producto.imagen || '',
      enOferta: Boolean(producto.enOferta),
      precioOferta: producto.precioOferta != null ? String(producto.precioOferta) : '',
      precio: producto.precio != null ? String(producto.precio) : '',
      categoriaNombre: producto.categoriaNombre || '',
      categoriaId: producto.categoriaId != null ? String(producto.categoriaId) : '',
    })
  }, [esEdicion, producto])

  const cambiar = (campo) => (evento) => {
    const valor = evento.target.type === 'checkbox' ? evento.target.checked : evento.target.value
    setForm((prev) => ({ ...prev, [campo]: valor }))
  }

  const seleccionarCategoria = (evento) => {
    const value = evento.target.value
    if (value === 'nueva') {
      setForm((prev) => ({ ...prev, categoriaId: '' }))
      return
    }
    const categoria = categorias.find((c) => String(c.id) === value)
    setForm((prev) => ({
      ...prev,
      categoriaId: value,
      categoriaNombre: categoria ? categoria.nombre : '',
    }))
  }

  const validar = () => {
    const nuevos = {}
    const precio = Number(form.precio)
    const oferta = Number(form.precioOferta)

    if (!form.nombre.trim()) nuevos.nombre = 'El nombre es obligatorio.'
    if (form.precio === '' || !Number.isFinite(precio) || precio <= 0) {
      nuevos.precio = 'Ingresa un precio mayor a 0.'
    }
    if (form.enOferta && (form.precioOferta === '' || !Number.isFinite(oferta) || oferta <= 0)) {
      nuevos.precioOferta = 'Para estar en oferta, ingresa un precio de oferta mayor a 0.'
    }
    if (form.categoriaId === '' && !form.categoriaNombre.trim()) {
      nuevos.categoria = 'Elige o escribe una categoría.'
    }
    return nuevos
  }

  const handleSubmit = async (evento) => {
    evento.preventDefault()
    const nuevosErrores = validar()
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length > 0) return

    const esNuevaCategoria = form.categoriaId === ''
    let categoriaId = Number(form.categoriaId)
    let categoriaNombre = form.categoriaNombre.trim()
    if (esNuevaCategoria) {
      const maxId = categorias.reduce((m, c) => Math.max(m, Number(c.id) || 0), 0)
      categoriaId = Math.max(maxId + 1, productos.length + 1)
      categoriaNombre = form.categoriaNombre.trim()
    }

    const payload = {
      nombre: form.nombre.trim(),
      descripcion: form.descripcion.trim(),
      precio: Number(form.precio),
      enOferta: form.enOferta,
      precioOferta: form.enOferta ? Number(form.precioOferta) : null,
      imagen: form.imagen.trim() || 'https://placehold.co/300x200?text=Producto',
      categoriaId,
      categoriaNombre,
    }

    setEnviando(true)
    try {
      if (esEdicion) {
        await actualizarProducto(id, payload)
        notify('Producto actualizado correctamente.', 'success')
      } else {
        await agregarProducto(payload)
        notify('Producto creado correctamente.', 'success')
      }
      navigate('/')
    } catch (err) {
      notify(err?.response?.data?.message || err?.message || 'No se pudo guardar el producto.', 'error')
    } finally {
      setEnviando(false)
    }
  }

  if (esEdicion && loading) return <Spinner texto="Cargando producto..." />

  if (esEdicion && !producto && !loading) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-16 text-center text-slate-500">
        No se encontró el producto solicitado.
      </main>
    )
  }

  const inputClase = (campo) =>
    `mt-1 block w-full rounded-lg border px-3 py-2 text-sm text-slate-900 outline-none transition focus:ring-2 ${
      errores[campo]
        ? 'border-red-400 focus:ring-red-200'
        : 'border-slate-300 focus:border-blue-500 focus:ring-blue-200'
    }`

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900">
        {esEdicion ? 'Editar producto' : 'Nuevo producto'}
      </h1>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-6 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Nombre <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.nombre}
            onChange={cambiar('nombre')}
            className={inputClase('nombre')}
            placeholder="Ej. Auriculares Bluetooth"
          />
          {errores.nombre && <p className="mt-1 text-xs text-red-600">{errores.nombre}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Descripción</label>
          <textarea
            rows={3}
            value={form.descripcion}
            onChange={cambiar('descripcion')}
            className={inputClase('descripcion')}
            placeholder="Describe el producto..."
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Precio <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={form.precio}
              onChange={cambiar('precio')}
              className={inputClase('precio')}
              placeholder="0.00"
            />
            {errores.precio && <p className="mt-1 text-xs text-red-600">{errores.precio}</p>}
          </div>

          <div>
            <label className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 py-2.5">
              <input
                type="checkbox"
                checked={form.enOferta}
                onChange={cambiar('enOferta')}
                className="h-4 w-4 accent-blue-600"
              />
              <span className="text-sm font-medium text-slate-700">En oferta</span>
            </label>
          </div>
        </div>

        {form.enOferta && (
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Precio de oferta <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={form.precioOferta}
              onChange={cambiar('precioOferta')}
              className={inputClase('precioOferta')}
              placeholder="0.00"
            />
            {errores.precioOferta && (
              <p className="mt-1 text-xs text-red-600">{errores.precioOferta}</p>
            )}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-700">Categoría</label>
          <select
            value={form.categoriaId}
            onChange={seleccionarCategoria}
            className={inputClase('categoria')}
          >
            <option value="">— Nueva categoría —</option>
            {categorias.map((c) => (
              <option key={c.clave} value={String(c.id)}>
                {c.nombre}
              </option>
            ))}
          </select>
          {form.categoriaId === '' && (
            <input
              type="text"
              value={form.categoriaNombre}
              onChange={cambiar('categoriaNombre')}
              className={`${inputClase('categoria')} mt-2`}
              placeholder="Escribe el nombre de la nueva categoría"
            />
          )}
          {errores.categoria && <p className="mt-1 text-xs text-red-600">{errores.categoria}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">URL de la imagen</label>
          <input
            type="text"
            value={form.imagen}
            onChange={cambiar('imagen')}
            className={inputClase('imagen')}
            placeholder="https://..."
          />
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={enviando}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {enviando && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"></span>
            )}
            {esEdicion ? 'Guardar cambios' : 'Crear producto'}
          </button>
        </div>
      </form>
    </main>
  )
}