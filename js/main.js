/* =========================================================
   main.js
   Comportamiento compartido de las tarjetas de producto:
   conecta el botón "Añadir" de cada tarjeta con el carrito
   real (carrito.js). El contador del nav se actualiza solo.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-anadir-carrito]').forEach((boton) => {
    boton.addEventListener('click', () => {
      const idProducto = boton.dataset.anadirCarrito;
      if (idProducto) {
        agregarAlCarrito(idProducto, 1);
      }
    });
  });
});
