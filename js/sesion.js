/* =========================================================
   sesion.js
   Maneja el "backend falso" de usuarios y sesión mientras no
   hay base de datos real:
   - Los usuarios registrados se guardan en localStorage.
   - Al cargar el sitio por primera vez, se crea un usuario
     administrador por defecto (ver ADMIN_POR_DEFECTO abajo).
   - iniciarSesion() busca coincidencia de correo/contraseña.
   - protegerAdmin() se llama al inicio de cada página del
     panel admin para exigir sesión y rol correcto.
   ========================================================= */

const CLAVE_USUARIOS = 'gamestore_usuarios';
const CLAVE_SESION = 'gamestore_sesion';

const ADMIN_POR_DEFECTO = {
  run: '111111111',
  nombre: 'Admin',
  apellidos: 'GameStore',
  correo: 'admin@duoc.cl',
  contrasena: 'admin123',
  tipoUsuario: 'administrador',
  region: '',
  comuna: '',
  direccion: '',
};

function obtenerUsuarios() {
  const datos = localStorage.getItem(CLAVE_USUARIOS);
  return datos ? JSON.parse(datos) : [];
}

function guardarUsuarios(usuarios) {
  localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));
}

/** Se ejecuta apenas carga cualquier página: asegura que exista al menos el admin de fábrica */
function sembrarAdminPorDefecto() {
  const usuarios = obtenerUsuarios();
  const existeAdmin = usuarios.some((u) => u.correo === ADMIN_POR_DEFECTO.correo);
  if (!existeAdmin) {
    usuarios.push(ADMIN_POR_DEFECTO);
    guardarUsuarios(usuarios);
  }
}
sembrarAdminPorDefecto();

function correoExiste(correo) {
  return obtenerUsuarios().some((u) => u.correo.toLowerCase() === correo.toLowerCase());
}

/** Usado por registro.html — guarda un usuario nuevo con rol "cliente" */
function registrarUsuario(datos) {
  const usuarios = obtenerUsuarios();
  usuarios.push({ ...datos, tipoUsuario: datos.tipoUsuario || 'cliente' });
  guardarUsuarios(usuarios);
}

/** Usado por admin/usuario-nuevo.html — permite fijar cualquier rol */
function guardarUsuarioAdmin(datos) {
  const usuarios = obtenerUsuarios();
  const indice = usuarios.findIndex((u) => u.correo === datos.correo);
  if (indice >= 0) {
    usuarios[indice] = datos;
  } else {
    usuarios.push(datos);
  }
  guardarUsuarios(usuarios);
}

function iniciarSesion(correo, contrasena) {
  const usuario = obtenerUsuarios().find(
    (u) => u.correo.toLowerCase() === correo.toLowerCase() && u.contrasena === contrasena
  );
  if (!usuario) return null;
  const sesion = { correo: usuario.correo, nombre: usuario.nombre, tipoUsuario: usuario.tipoUsuario };
  localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion));
  return sesion;
}

function obtenerSesion() {
  const datos = localStorage.getItem(CLAVE_SESION);
  return datos ? JSON.parse(datos) : null;
}

function cerrarSesion() {
  localStorage.removeItem(CLAVE_SESION);
}

/**
 * Llamar al inicio de cada página del panel admin.
 * Si no hay sesión, redirige a login. Si el rol no está en
 * rolesPermitidos, redirige a la home del admin (o a la tienda
 * si tampoco tiene acceso a nada del admin).
 * prefijo: '../' si la página está dentro de /admin, '' si no.
 */
function protegerAdmin(rolesPermitidos, prefijo = '') {
  const sesion = obtenerSesion();
  if (!sesion) {
    window.location.href = `${prefijo}login.html`;
    return null;
  }
  if (!rolesPermitidos.includes(sesion.tipoUsuario)) {
    window.location.href = `${prefijo}index.html`;
    return null;
  }
  return sesion;
}

/**
 * Ajusta el sidebar del panel admin según el rol:
 * el Vendedor ve "Productos" pero no "Usuarios" ni el botón
 * "Nuevo producto" (según la pauta, el vendedor solo visualiza).
 */
function ajustarSidebarSegunRol(sesion) {
  const linkUsuarios = document.getElementById('link-usuarios');
  const botonNuevoProducto = document.getElementById('boton-nuevo-producto');
  const nombreSidebar = document.getElementById('admin-usuario-nombre');
  const botonCerrarAdmin = document.getElementById('admin-cerrar-sesion');

  if (sesion.tipoUsuario === 'vendedor') {
    if (linkUsuarios) linkUsuarios.style.display = 'none';
    if (botonNuevoProducto) botonNuevoProducto.style.display = 'none';
  }

  if (nombreSidebar) {
    nombreSidebar.textContent = `${sesion.nombre} · ${sesion.tipoUsuario}`;
  }
  if (botonCerrarAdmin) {
    botonCerrarAdmin.addEventListener('click', (evento) => {
      evento.preventDefault();
      cerrarSesion();
      window.location.href = '../login.html';
    });
  }
}

/** Actualiza el nav de las páginas de la tienda: invitado vs. sesión iniciada */
function actualizarNavSesion() {
  const sesion = obtenerSesion();
  const bloqueInvitado = document.getElementById('nav-invitado');
  const bloqueSesion = document.getElementById('nav-sesion');
  const nombreEl = document.getElementById('nav-sesion-nombre');
  const botonCerrar = document.getElementById('nav-cerrar-sesion');

  if (!bloqueInvitado || !bloqueSesion) return; // esta página no tiene ese nav

  if (sesion) {
    bloqueInvitado.style.display = 'none';
    bloqueSesion.style.display = 'inline-flex';
    if (nombreEl) nombreEl.textContent = `Hola, ${sesion.nombre}`;
  } else {
    bloqueInvitado.style.display = 'inline';
    bloqueSesion.style.display = 'none';
  }

  if (botonCerrar) {
    botonCerrar.addEventListener('click', (evento) => {
      evento.preventDefault();
      cerrarSesion();
      window.location.href = 'index.html';
    });
  }
}

document.addEventListener('DOMContentLoaded', actualizarNavSesion);
