/* =========================================================
   validaciones.js
   Funciones reutilizables de validación. Cada página con
   formulario (login, registro, contacto, admin) las importa
   y las usa en su propio script — así la lógica de "cómo se
   valida un correo" vive en un solo lugar.
   ========================================================= */

const DOMINIOS_PERMITIDOS = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com'];

function mostrarError(campoEl, mensaje) {
  campoEl.classList.add('con-error');
  const errorEl = campoEl.querySelector('.campo__error');
  if (errorEl) errorEl.textContent = mensaje;
}

function limpiarError(campoEl) {
  campoEl.classList.remove('con-error');
  const errorEl = campoEl.querySelector('.campo__error');
  if (errorEl) errorEl.textContent = '';
}

function validarRequerido(valor) {
  return valor.trim().length > 0;
}

function validarLargo(valor, min, max) {
  const largo = valor.trim().length;
  if (min !== null && largo < min) return false;
  if (max !== null && largo > max) return false;
  return true;
}

function validarCorreo(valor) {
  const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!patron.test(valor)) return false;
  const dominio = valor.split('@')[1]?.toLowerCase();
  return DOMINIOS_PERMITIDOS.includes(dominio);
}

/**
 * Valida un RUN chileno sin puntos ni guion, ej: 19011022K
 * Verifica el dígito verificador con el algoritmo módulo 11.
 */
function validarRun(valor) {
  const run = valor.trim().toUpperCase();
  if (!/^[0-9]{6,8}[0-9K]$/.test(run)) return false;

  const cuerpo = run.slice(0, -1);
  const dv = run.slice(-1);

  let suma = 0;
  let multiplo = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i], 10) * multiplo;
    multiplo = multiplo === 7 ? 2 : multiplo + 1;
  }

  const resto = 11 - (suma % 11);
  let dvEsperado;
  if (resto === 11) dvEsperado = '0';
  else if (resto === 10) dvEsperado = 'K';
  else dvEsperado = String(resto);

  return dv === dvEsperado;
}

/** Contraseña: requerida, entre 4 y 10 caracteres */
function validarContrasena(valor) {
  return validarRequerido(valor) && validarLargo(valor, 4, 10);
}
