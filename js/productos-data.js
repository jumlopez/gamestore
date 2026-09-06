/* =========================================================
   productos-data.js
   Arreglo de productos "de mentira" para que las vistas
   tengan algo que listar mientras no hay base de datos.
   Cuando conecten un backend, esto se reemplaza por el
   fetch a la API — la forma del objeto (id, nombre, precio,
   plataforma, etc.) debería mantenerse igual.
   ========================================================= */

const PRODUCTOS = [
  { id: 'p1', nombre: 'Nombre del juego 1', plataforma: 'pc', precio: 29990, stock: 12, stockCritico: 3, descripcion: 'Descripción de ejemplo del juego. Reemplacen por el texto real.' },
  { id: 'p2', nombre: 'Nombre del juego 2', plataforma: 'ps5', precio: 44990, stock: 8, stockCritico: 3, descripcion: 'Descripción de ejemplo del juego. Reemplacen por el texto real.' },
  { id: 'p3', nombre: 'Nombre del juego 3', plataforma: 'xbox', precio: 34990, stock: 0, stockCritico: 3, descripcion: 'Descripción de ejemplo del juego. Reemplacen por el texto real.' },
  { id: 'p4', nombre: 'Nombre del juego 4', plataforma: 'switch', precio: 39990, stock: 15, stockCritico: 3, descripcion: 'Descripción de ejemplo del juego. Reemplacen por el texto real.' },
  { id: 'p5', nombre: 'Nombre del juego 5', plataforma: 'pc', precio: 19990, stock: 2, stockCritico: 3, descripcion: 'Descripción de ejemplo del juego. Reemplacen por el texto real.' },
  { id: 'p6', nombre: 'Nombre del juego 6', plataforma: 'ps5', precio: 54990, stock: 6, stockCritico: 3, descripcion: 'Descripción de ejemplo del juego. Reemplacen por el texto real.' },
];

function formatearPrecio(numero) {
  return '$' + numero.toLocaleString('es-CL');
}

function obtenerProductoPorId(id) {
  return PRODUCTOS.find((producto) => producto.id === id);
}
