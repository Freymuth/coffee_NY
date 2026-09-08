// Arreglo de regiones y comunas
const datosRegiones = [
  {
    region: "Región Metropolitana de Santiago",
    comunas: ["Santiago", "Providencia", "Las Condes", "Maipú", "Puente Alto", "Pudahuel"]
  },
  {
    region: "Valparaíso",
    comunas: ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", "Concón"]
  },
  {
    region: "Biobío",
    comunas: ["Concepción", "Talcahuano", "San Pedro de la Paz", "Chillán", "Los Ángeles"]
  }
];

// Cargar las regiones al cargar la ventana
window.addEventListener("DOMContentLoaded", function () {
  const selectRegion = document.getElementById("region");
  
  if (selectRegion) {
    // Limpiar opciones previas manteniendo el placeholder
    selectRegion.innerHTML = '<option value="">Seleccione una región...</option>';
    
    datosRegiones.forEach(function (item) {
      const option = document.createElement("option");
      option.value = item.region;
      option.textContent = item.region;
      selectRegion.appendChild(option);
    });
  }
});

// Función para actualizar las comunas según la región seleccionada
function cargarComunas() {
  const selectRegion = document.getElementById("region");
  const selectComuna = document.getElementById("comuna");
  
  if (!selectRegion || !selectComuna) return;

  const regionSeleccionada = selectRegion.value;
  selectComuna.innerHTML = '<option value="">Seleccione una comuna...</option>';

  if (regionSeleccionada === "") {
    selectComuna.innerHTML = '<option value="">Seleccione primero una región...</option>';
    return;
  }

  // Buscar las comunas correspondientes a la región
  const objetoRegion = datosRegiones.find(item => item.region === regionSeleccionada);

  if (objetoRegion) {
    objetoRegion.comunas.forEach(function (comuna) {
      const option = document.createElement("option");
      option.value = comuna;
      option.textContent = comuna;
      selectComuna.appendChild(option);
    });
  }
}