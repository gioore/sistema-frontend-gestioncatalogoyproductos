import axios from 'axios'
import { BASE_URL } from '../config/api.js'

const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function getProductos() {
  const { data } = await http.get('/')
  return data
}

export async function getProductoById(id) {
  const { data } = await http.get(`/${id}`)
  return data
}

export async function crearProducto(producto) {
  const { data } = await http.post('/', producto)
  return data
}

export async function actualizarProducto(id, producto) {
  const { data } = await http.put(`/${id}`, producto)
  return data
}

export async function eliminarProducto(id) {
  await http.delete(`/${id}`)
}