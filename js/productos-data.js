/* =========================================================
   productos-data.js
   Arreglo de productos "de mentira" para que las vistas
   tengan algo que listar mientras no hay base de datos.
   Cuando conecten un backend, esto se reemplaza por el
   fetch a la API — la forma del objeto (id, nombre, precio,
   plataforma, etc.) debería mantenerse igual.
   ========================================================= */

const PRODUCTOS = [

  { id: 'p1', nombre: 'Elden Ring', plataforma: 'ps5', precio: 39990, stock: 12, stockCritico: 3,
    descripcion: 'RPG de acción en un mundo abierto creado por FromSoftware y George R. R. Martin.',
    imagen: 'img/elden-ring.jpg', genero: 'RPG de acción' },

  { id: 'p2', nombre: 'Grand Theft Auto V Enhanced', plataforma: 'pc', precio: 29990, stock: 12, stockCritico: 3, 
    descripcion: 'Experimenta los exitosos títulos Grand Theft Auto V y Grand Theft Auto Online, ahora actualizados para una nueva generación con efectos visuales impresionantes, carga más rápida, audio 3D y mucho más, además de contenido exclusivo para los jugadores de GTA Online.', 
    imagen: 'img/GTA-5.jpg', genero: 'Acción' },

  { id: 'p3', nombre: 'Marvel Spider-Man 2', plataforma: 'ps5', precio: 54990, stock: 0, stockCritico: 3, 
    descripcion: 'Únete a Peter Parker y Miles Morales mientras se enfrentan a nuevos y peligrosos villanos que amenazan la ciudad de Nueva York. Conviértete en el héroe que la ciudad necesita, balanceándote entre rascacielos y utilizando tus habilidades arácnidas para proteger a los inocentes.', 
    imagen: 'img/spiderman.jpg', genero: 'Aventura' },

  { id: 'p4', nombre: 'Donkey Kong Country Returns HD', plataforma: 'switch', precio: 61990, stock: 15, stockCritico: 3, 
    descripcion: 'Emprende una aventura llena de vibrantes niveles repletos de obstáculos en diversas plataformas por toda la Isla de Donkey Kong. Allí podrás pisotear y rodar a través de entornos que incluyen junglas y volcanes.', 
    imagen: 'img/DKKCountry.png', genero: 'Estrategia' },

  { id: 'p5', nombre: 'Nombre del juego 5', plataforma: 'pc', precio: 19990, stock: 2, stockCritico: 3, 
    descripcion: 'Descripción de ejemplo del juego. Reemplacen por el texto real.', 
    imagen: 'img/juego5.jpg', genero: 'Simulación' },

  { id: 'p6', nombre: 'Nombre del juego 6', plataforma: 'ps5', precio: 54990, stock: 6, stockCritico: 3, 
    descripcion: 'Descripción de ejemplo del juego. Reemplacen por el texto real.', 
    imagen: 'img/juego6.jpg', genero: 'Deportes' },
];

function formatearPrecio(numero) {
  return '$' + numero.toLocaleString('es-CL');
}

function obtenerProductoPorId(id) {
  return PRODUCTOS.find((producto) => producto.id === id);
}
