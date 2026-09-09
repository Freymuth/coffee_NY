// Función auxiliar sencilla para mostrar mensajes en los <span>
function mostrarError(idSpan, mensaje) {
  const span = document.getElementById(idSpan);
  if (span) {
    span.textContent = mensaje;
  }
}

// Limpiar todos los mensajes de error
function limpiarErrores() {
  const spans = document.querySelectorAll('span[id^="mensaje_"]');
  spans.forEach(span => span.textContent = "");
}

// 1. VALIDACIÓN FORMULARIO CONTACTO
function validarContacto() {
  limpiarErrores();
  let esValido = true;

  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const comentario = document.getElementById("comentario").value.trim();

  if (nombre === "") {
    mostrarError("mensaje_nombre", "El nombre es obligatorio.");
    esValido = false;
  }

  if (correo === "" || !correo.includes("@")) {
    mostrarError("mensaje_correo", "Ingrese un correo válido.");
    esValido = false;
  }

  if (comentario === "") {
    mostrarError("mensaje_comentario", "El comentario no puede estar vacío.");
    esValido = false;
  }

  if (esValido) {
    alert("¡Mensaje enviado con éxito!");
    document.getElementById("form_contacto").reset();
  }
}

// 2. VALIDACIÓN FORMULARIO LOGIN
function validarLogin() {
  limpiarErrores();
  let esValido = true;

  const correo = document.getElementById("correo").value.trim();
  const password = document.getElementById("password").value.trim();

  if (correo === "") {
    mostrarError("mensaje_correo", "Ingrese su correo.");
    esValido = false;
  }

  if (password === "") {
    mostrarError("mensaje_password", "Ingrese su contraseña.");
    esValido = false;
  }

  if (esValido) {
    alert("¡Inicio de sesión correcto!");
    window.location.href = "../Admin/admin-home.html";
  }
}

// 3. VALIDACIÓN FORMULARIO REGISTRO / USUARIO
function validarRegistro() {
  limpiarErrores();
  let esValido = true;

  const run = document.getElementById("run").value.trim();
  const nombre = document.getElementById("nombre").value.trim();
  const apellidos = document.getElementById("apellidos").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const region = document.getElementById("region").value;
  const comuna = document.getElementById("comuna").value;
  const direccion = document.getElementById("direccion").value.trim();

  if (run === "") {
    mostrarError("mensaje_run", "El RUN es obligatorio.");
    esValido = false;
  }

  if (nombre === "") {
    mostrarError("mensaje_nombre", "El nombre es obligatorio.");
    esValido = false;
  }

  if (apellidos === "") {
    mostrarError("mensaje_apellidos", "Los apellidos son obligatorios.");
    esValido = false;
  }

  if (correo === "" || !correo.includes("@")) {
    mostrarError("mensaje_correo", "Ingrese un correo válido.");
    esValido = false;
  }

  if (region === "") {
    mostrarError("mensaje_region", "Seleccione una región.");
    esValido = false;
  }

  if (comuna === "") {
    mostrarError("mensaje_comuna", "Seleccione una comuna.");
    esValido = false;
  }

  if (direccion === "") {
    mostrarError("mensaje_direccion", "La dirección es obligatoria.");
    esValido = false;
  }

  if (esValido) {
    alert("¡Usuario registrado con éxito!");
  }
}

// 4. VALIDACIÓN FORMULARIO PRODUCTO (ADMIN)
function validarProducto() {
  limpiarErrores();
  let esValido = true;

  const codigo = document.getElementById("codigo").value.trim();
  const nombre = document.getElementById("nombre").value.trim();
  const precio = document.getElementById("precio").value;
  const stock = document.getElementById("stock").value;
  const categoria = document.getElementById("categoria").value;

  if (codigo === "") {
    mostrarError("mensaje_codigo", "El código es obligatorio.");
    esValido = false;
  }

  if (nombre === "") {
    mostrarError("mensaje_nombre", "El nombre es obligatorio.");
    esValido = false;
  }

  if (precio === "" || precio <= 0) {
    mostrarError("mensaje_precio", "Ingrese un precio válido mayor a 0.");
    esValido = false;
  }

  if (stock === "" || stock < 0) {
    mostrarError("mensaje_stock", "Ingrese un stock válido.");
    esValido = false;
  }

  if (categoria === "") {
    mostrarError("mensaje_categoria", "Seleccione una categoría.");
    esValido = false;
  }

  if (esValido) {
    alert("¡Producto guardado con éxito!");
    window.location.href = "admin-productos.html";
  }
}