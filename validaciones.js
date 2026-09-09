// ============================================
// Café NY - Validaciones de formularios
// Compatible con los IDs existentes en el proyecto
// ============================================

const DOMINIOS_PERMITIDOS = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

function mostrarError(spanId, mensaje) {
    const span = document.getElementById(spanId);
    if (span) {
        span.textContent = mensaje;
        span.style.color = "red";
    }
}

function limpiarError(spanId) {
    const span = document.getElementById(spanId);
    if (span) span.textContent = "";
}

function validarCorreo(inputId, spanId, requerido = true) {
    const valor = document.getElementById(inputId).value.trim();

    if (requerido && valor === "") {
        mostrarError(spanId, "El correo es obligatorio.");
        return false;
    }
    if (valor !== "" && valor.length > 100) {
        mostrarError(spanId, "El correo no puede superar 100 caracteres.");
        return false;
    }
    const dominioValido = DOMINIOS_PERMITIDOS.some(d => valor.toLowerCase().endsWith(d));
    if (valor !== "" && !dominioValido) {
        mostrarError(spanId, "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.");
        return false;
    }
    limpiarError(spanId);
    return true;
}

function validarTexto(inputId, spanId, { requerido = true, min = 0, max = 100, nombreCampo = "Este campo" } = {}) {
    const valor = document.getElementById(inputId).value.trim();

    if (requerido && valor === "") {
        mostrarError(spanId, `${nombreCampo} es obligatorio.`);
        return false;
    }
    if (valor !== "" && valor.length < min) {
        mostrarError(spanId, `${nombreCampo} debe tener al menos ${min} caracteres.`);
        return false;
    }
    if (valor !== "" && valor.length > max) {
        mostrarError(spanId, `${nombreCampo} no puede superar ${max} caracteres.`);
        return false;
    }
    limpiarError(spanId);
    return true;
}

function validarNumero(inputId, spanId, { requerido = true, min = 0, entero = true, nombreCampo = "Este campo" } = {}) {
    const valorTexto = document.getElementById(inputId).value.trim();

    if (!requerido && valorTexto === "") {
        limpiarError(spanId);
        return true;
    }
    if (requerido && valorTexto === "") {
        mostrarError(spanId, `${nombreCampo} es obligatorio.`);
        return false;
    }
    const numero = Number(valorTexto);
    if (isNaN(numero)) {
        mostrarError(spanId, `${nombreCampo} debe ser un número válido.`);
        return false;
    }
    if (entero && !Number.isInteger(numero)) {
        mostrarError(spanId, `${nombreCampo} debe ser un número entero.`);
        return false;
    }
    if (numero < min) {
        mostrarError(spanId, `${nombreCampo} no puede ser menor a ${min}.`);
        return false;
    }
    limpiarError(spanId);
    return true;
}

function validarSeleccion(inputId, spanId, nombreCampo = "una opción") {
    const valor = document.getElementById(inputId).value;
    if (valor === "") {
        mostrarError(spanId, `Debes seleccionar ${nombreCampo}.`);
        return false;
    }
    limpiarError(spanId);
    return true;
}

// Algoritmo módulo 11 para el dígito verificador del RUN chileno
function calcularDV(cuerpo) {
    let suma = 0, mult = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += Number(cuerpo[i]) * mult;
        mult = mult === 7 ? 2 : mult + 1;
    }
    const resto = 11 - (suma % 11);
    if (resto === 11) return "0";
    if (resto === 10) return "K";
    return String(resto);
}

function validarRun(inputId, spanId) {
    const valor = document.getElementById(inputId).value.trim().toUpperCase();

    if (valor === "") {
        mostrarError(spanId, "El RUN es obligatorio.");
        return false;
    }
    if (valor.length < 7 || valor.length > 9) {
        mostrarError(spanId, "El RUN debe tener entre 7 y 9 caracteres (sin puntos ni guion).");
        return false;
    }
    if (!/^[0-9]+[0-9K]$/.test(valor)) {
        mostrarError(spanId, "Formato de RUN inválido. Ejemplo: 19011022K.");
        return false;
    }
    const cuerpo = valor.slice(0, -1);
    const dv = valor.slice(-1);
    if (dv !== calcularDV(cuerpo)) {
        mostrarError(spanId, "El dígito verificador del RUN no es válido.");
        return false;
    }
    limpiarError(spanId);
    return true;
}

// ============================================
// registro.html
// ============================================
function validarRegistro() {
    const okRun = validarRun("run", "mensaje_run");
    const okNombre = validarTexto("nombre", "mensaje_nombre", { max: 50, nombreCampo: "El nombre" });
    const okApellidos = validarTexto("apellidos", "mensaje_apellidos", { max: 100, nombreCampo: "Los apellidos" });
    const okCorreo = validarCorreo("correo", "mensaje_correo");
    const okRegion = validarSeleccion("region", "mensaje_region", "una región");
    const okComuna = validarSeleccion("comuna", "mensaje_comuna", "una comuna");
    const okDireccion = validarTexto("direccion", "mensaje_direccion", { max: 300, nombreCampo: "La dirección" });

    if (okRun && okNombre && okApellidos && okCorreo && okRegion && okComuna && okDireccion) {
        alert("Registro exitoso (simulado). No hay conexión a backend en esta etapa.");
    }
}

// ============================================
// login.html
// ============================================
function validarLogin() {
    const okCorreo = validarCorreo("correo", "mensaje_correo");
    const valorPass = document.getElementById("password").value;
    let okPass = true;

    if (valorPass === "") {
        mostrarError("mensaje_password", "La contraseña es obligatoria.");
        okPass = false;
    } else if (valorPass.length < 4 || valorPass.length > 10) {
        mostrarError("mensaje_password", "La contraseña debe tener entre 4 y 10 caracteres.");
        okPass = false;
    } else {
        limpiarError("mensaje_password");
    }

    if (okCorreo && okPass) {
        alert("Inicio de sesión exitoso (simulado). No hay conexión a backend en esta etapa.");
    }
}

// ============================================
// contacto.html
// ============================================
function validarContacto() {
    const okNombre = validarTexto("nombre", "mensaje_nombre", { max: 100, nombreCampo: "El nombre" });
    const okCorreo = validarCorreo("correo", "mensaje_correo", false);
    const okComentario = validarTexto("comentario", "mensaje_comentario", { max: 500, nombreCampo: "El comentario" });

    if (okNombre && okCorreo && okComentario) {
        alert("Tu mensaje fue enviado (simulado).");
        document.getElementById("form_contacto").reset();
    }
}

// ============================================
// admin-producto-nuevo.html / admin-producto-editar.html
// ============================================
function validarProducto() {
    const okCodigo = validarTexto("codigo", "mensaje_codigo", { min: 3, max: 100000, nombreCampo: "El código" });
    const okNombre = validarTexto("nombre", "mensaje_nombre", { max: 100, nombreCampo: "El nombre" });
    const okDescripcion = validarTexto("descripcion", "mensaje_descripcion", { requerido: false, max: 500, nombreCampo: "La descripción" });
    const okPrecio = validarNumero("precio", "mensaje_precio", { min: 0, entero: false, nombreCampo: "El precio" });
    const okStock = validarNumero("stock", "mensaje_stock", { min: 0, entero: true, nombreCampo: "El stock" });
    const okStockCritico = validarNumero("stock_critico", "mensaje_stock_critico", { requerido: false, min: 0, entero: true, nombreCampo: "El stock crítico" });
    const okCategoria = validarSeleccion("categoria", "mensaje_categoria", "una categoría");

    if (okCodigo && okNombre && okDescripcion && okPrecio && okStock && okStockCritico && okCategoria) {
        alert("Producto guardado (simulado). No hay conexión a backend en esta etapa.");
    }
}

// ============================================
// admin-usuario-nuevo.html / admin-usuario-editar.html
// ============================================
function validarUsuario() {
    const okRun = validarRun("run", "mensaje_run");
    const okNombre = validarTexto("nombre", "mensaje_nombre", { max: 50, nombreCampo: "El nombre" });
    const okApellidos = validarTexto("apellidos", "mensaje_apellidos", { max: 100, nombreCampo: "Los apellidos" });
    const okCorreo = validarCorreo("correo", "mensaje_correo");
    const okTipo = validarSeleccion("tipo_usuario", "mensaje_tipo", "un tipo de usuario");
    const okRegion = validarSeleccion("region", "mensaje_region", "una región");
    const okComuna = validarSeleccion("comuna", "mensaje_comuna", "una comuna");
    const okDireccion = validarTexto("direccion", "mensaje_direccion", { max: 300, nombreCampo: "La dirección" });

    if (okRun && okNombre && okApellidos && okCorreo && okTipo && okRegion && okComuna && okDireccion) {
        alert("Usuario guardado (simulado). No hay conexión a backend en esta etapa.");
    }
}