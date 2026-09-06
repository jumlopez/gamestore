# GameStore — proyecto completo (Evaluación 1, DSY1104)

Reemplacen "GameStore" por el nombre real de la tienda buscando y
reemplazando el texto en todos los `.html`.

## Estructura

```
/
├── index.html               → Home
├── productos.html            → Catálogo con filtro por plataforma
├── detalle-producto.html     → Detalle de un juego (usa ?id=)
├── carrito.html              → Carrito real con localStorage
├── login.html                → Inicio de sesión (con roles)
├── registro.html             → Registro de usuario (RUN, región/comuna)
├── contacto.html             → Formulario de contacto
├── nosotros.html
├── blogs.html                → Listado de 2 casos curiosos
├── blog-detalle-1.html
├── blog-detalle-2.html
├── admin/
│   ├── index.html            → Home del panel admin (protegida)
│   ├── productos.html        → Listado de productos (protegida)
│   ├── producto-nuevo.html   → Crear/editar producto — solo Administrador
│   ├── usuarios.html         → Listado de usuarios — solo Administrador
│   └── usuario-nuevo.html    → Crear/editar usuario — solo Administrador
├── css/
│   └── styles.css            → Hoja de estilos única para todo el sitio
├── js/
│   ├── productos-data.js     → Arreglo de productos de ejemplo
│   ├── carrito.js            → Lógica del carrito (localStorage)
│   ├── sesion.js             → Usuarios, login y protección de rutas admin
│   ├── validaciones.js       → Funciones de validación reutilizables
│   ├── regiones.js           → Arreglo de regiones/comunas (select en cascada)
│   └── main.js                → Conecta los botones "Añadir" al carrito
└── img/                       → Acá van las portadas reales
```

## Cómo probarlo

Extraigan el zip completo (no abran el HTML desde dentro del zip) y
abran `index.html` con doble clic. Todo — carrito, formularios,
login — funciona directo en el navegador porque `localStorage`
funciona incluso abriendo el archivo con `file://`. No necesitan
servidor para esta entrega.

## Usuario administrador y sistema de roles

No hay backend real, así que la "base de datos" de usuarios vive en
`localStorage` (`js/sesion.js`). Al abrir el sitio por primera vez se
crea automáticamente un administrador de fábrica:

```
Correo:      admin@duoc.cl
Contraseña:  admin123
```

Inicien sesión con eso en `login.html` — redirige directo a
`admin/index.html`. Desde ahí, "Usuarios → Nuevo usuario" pueden
crear una cuenta de **Vendedor** para probar el otro rol: un
Vendedor ve el listado de Productos pero no puede editar productos
ni acceder a Usuarios (el link ni siquiera aparece en su sidebar).
Cualquiera que se registre desde `registro.html` (el formulario
público de la tienda) queda como **Cliente**.

Si alguien entra directo a una URL de `admin/` sin sesión iniciada,
`protegerAdmin()` lo redirige a `login.html`. Si un Vendedor intenta
entrar a `producto-nuevo.html` o `usuarios.html` por URL directa,
lo redirige de vuelta a `admin/index.html`.

## Qué es real y qué es de ejemplo

- **Datos de productos**: viven en `js/productos-data.js` como un
  arreglo fijo. No hay base de datos — cuando lleguen a esa etapa del
  ramo, ese arreglo se reemplaza por datos que vengan de una API.
- **Carrito**: 100% funcional — agrega, quita, cambia cantidad, y
  persiste en `localStorage`.
- **Usuarios y sesión**: 100% funcionales — el registro público
  realmente guarda el usuario, el login realmente valida contra esos
  datos, y la sesión controla el acceso al panel admin y qué ve cada
  rol. Es una simulación de autenticación (no hay servidor ni
  contraseñas cifradas), pero el flujo completo es real.
- **Validaciones**: corren en tiempo real (al escribir), siguiendo
  los límites exactos de la pauta (min/max caracteres, dominios de
  correo permitidos, RUN chileno con dígito verificador, contraseña
  4-10 caracteres, etc.).

## Reparto sugerido

- **Admin (Juan):** ya viene armado, incluyendo el login con roles —
  revisen `admin/` y `js/sesion.js`, y ajusten a gusto.
- **Productos + Detalle producto:** ya viene armado — enfocarse en
  mejorar el diseño de la ficha de producto.
- **Registro + Login + Carrito:** ya vienen armados — enfocarse en
  pulir el flujo.
- **Nosotros + Blogs + Contacto:** ya vienen armados con contenido
  placeholder — reemplazar por contenido real del equipo.

Con todo esto armado, el trabajo que queda es: reemplazar contenido
placeholder por el real, agregar imágenes propias en `img/`, y decidir
el nombre final de la tienda.

## Clases CSS ya listas para usar

- `.tarjeta-juego` → tarjeta de producto
- `.formulario` / `.campo` / `.campo__error` → estructura de
  formularios con validación (la clase `con-error` en `.campo` hace
  aparecer el mensaje de error automáticamente)
- `.boton-primario` → botón de acción principal
- `.filtros` → sidebar de filtros
- `.admin-layout` / `.admin-sidebar` / `.tabla` → panel admin
