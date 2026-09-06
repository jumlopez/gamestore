/* =========================================================
   regiones.js
   Arreglo complementario de regiones y comunas (Chile).
   Se usa para poblar los selects de región/comuna en los
   formularios de registro de usuario. Está acotado a un par
   de regiones de ejemplo — agreguen más si lo necesitan.
   ========================================================= */

const REGIONES = [
  {
    nombre: 'Región Metropolitana de Santiago',
    comunas: ['Santiago', 'Providencia', 'Ñuñoa', 'Maipú', 'Puente Alto'],
  },
  {
    nombre: 'Región de la Araucanía',
    comunas: ['Temuco', 'Villarrica', 'Angol', 'Pucón'],
  },
  {
    nombre: 'Región de Ñuble',
    comunas: ['Chillán', 'San Carlos', 'Bulnes'],
  },
];

function poblarSelectRegiones(selectRegion, selectComuna) {
  selectRegion.innerHTML = '<option value="">-- Seleccione la región --</option>';
  REGIONES.forEach((region) => {
    const opcion = document.createElement('option');
    opcion.value = region.nombre;
    opcion.textContent = region.nombre;
    selectRegion.appendChild(opcion);
  });

  selectRegion.addEventListener('change', () => {
    const region = REGIONES.find((r) => r.nombre === selectRegion.value);
    selectComuna.innerHTML = '<option value="">-- Seleccione la comuna --</option>';
    if (region) {
      region.comunas.forEach((comuna) => {
        const opcion = document.createElement('option');
        opcion.value = comuna;
        opcion.textContent = comuna;
        selectComuna.appendChild(opcion);
      });
    }
  });
}
