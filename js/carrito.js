/* =========================================================
   carrito.js
   Carrito de compras persistido en localStorage.
   Se incluye en TODAS las páginas para que el contador del
   nav esté siempre actualizado, y en carrito.html además
   dibuja el detalle completo.
   ========================================================= */

const CLAVE_CARRITO = 'gamestore_carrito';

function leerCarrito() {
  const datos = localStorage.getItem(CLAVE_CARRITO);
  return datos ? JSON.parse(datos) : [];
}

function guardarCarrito(carrito) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  actualizarContadorNav();
}

function agregarAlCarrito(idProducto, cantidad = 1) {
  const carrito = leerCarrito();
  const existente = carrito.find((item) => item.id === idProducto);
  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({ id: idProducto, cantidad });
  }
  guardarCarrito(carrito);
}

function quitarDelCarrito(idProducto) {
  const carrito = leerCarrito().filter((item) => item.id !== idProducto);
  guardarCarrito(carrito);
}

function cambiarCantidad(idProducto, delta) {
  const carrito = leerCarrito();
  const item = carrito.find((i) => i.id === idProducto);
  if (!item) return;
  item.cantidad += delta;
  if (item.cantidad <= 0) {
    quitarDelCarrito(idProducto);
    return;
  }
  guardarCarrito(carrito);
}

function totalItemsCarrito() {
  return leerCarrito().reduce((total, item) => total + item.cantidad, 0);
}

function actualizarContadorNav() {
  const contador = document.getElementById('contador-carrito');
  if (contador) {
    contador.textContent = totalItemsCarrito();
  }
}

/** Dibuja el detalle del carrito en carrito.html (si esa sección existe en la página) */
function renderizarCarrito() {
  const contenedor = document.getElementById('carrito-items');
  const resumenTotal = document.getElementById('carrito-total');
  const vacioEl = document.getElementById('carrito-vacio');
  if (!contenedor) return; // esta página no tiene el detalle del carrito

  const carrito = leerCarrito();
  contenedor.innerHTML = '';

  if (carrito.length === 0) {
    if (vacioEl) vacioEl.style.display = 'block';
    if (resumenTotal) resumenTotal.textContent = formatearPrecio(0);
    return;
  }

  if (vacioEl) vacioEl.style.display = 'none';

  let total = 0;

  carrito.forEach((item) => {
    const producto = obtenerProductoPorId(item.id);
    if (!producto) return;

    const subtotal = producto.precio * item.cantidad;
    total += subtotal;

    const fila = document.createElement('div');
    fila.className = 'carrito-item';
    fila.innerHTML = `
      <div class="carrito-item__img"></div>
      <div>
        <strong>${producto.nombre}</strong>
        <div class="campo__ayuda">${formatearPrecio(producto.precio)} c/u</div>
      </div>
      <div class="carrito-item__cantidad">
        <button type="button" data-restar="${producto.id}">−</button>
        <span>${item.cantidad}</span>
        <button type="button" data-sumar="${producto.id}">+</button>
      </div>
      <div style="text-align:right;">
        <div>${formatearPrecio(subtotal)}</div>
        <button type="button" class="carrito-item__eliminar" data-eliminar="${producto.id}">Eliminar</button>
      </div>
    `;
    contenedor.appendChild(fila);
  });

  if (resumenTotal) resumenTotal.textContent = formatearPrecio(total);

  contenedor.querySelectorAll('[data-sumar]').forEach((boton) => {
    boton.addEventListener('click', () => {
      cambiarCantidad(boton.dataset.sumar, 1);
      renderizarCarrito();
    });
  });
  contenedor.querySelectorAll('[data-restar]').forEach((boton) => {
    boton.addEventListener('click', () => {
      cambiarCantidad(boton.dataset.restar, -1);
      renderizarCarrito();
    });
  });
  contenedor.querySelectorAll('[data-eliminar]').forEach((boton) => {
    boton.addEventListener('click', () => {
      quitarDelCarrito(boton.dataset.eliminar);
      renderizarCarrito();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  actualizarContadorNav();
  renderizarCarrito();
});
