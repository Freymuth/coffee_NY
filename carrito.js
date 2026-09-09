// ============================================
// Café NY - Lógica del carrito (localStorage)
// ============================================

const CARRITO_KEY = "coffee_ny_carrito";

function obtenerCarrito() {
    const datos = localStorage.getItem(CARRITO_KEY);
    return datos ? JSON.parse(datos) : [];
}

function guardarCarrito(carrito) {
    localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito));
}

// Llamar así desde los botones "Añadir al carrito": onclick="agregarAlCarrito('Café Espresso', 2500)"
function agregarAlCarrito(nombre, precio) {
    const carrito = obtenerCarrito();
    const existente = carrito.find(item => item.nombre === nombre);

    if (existente) {
        existente.cantidad += 1;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }

    guardarCarrito(carrito);
    alert(nombre + " añadido al carrito.");
}

function eliminarDelCarrito(nombre) {
    let carrito = obtenerCarrito();
    carrito = carrito.filter(item => item.nombre !== nombre);
    guardarCarrito(carrito);
    renderCarrito();
}

function cambiarCantidad(nombre, inputElemento) {
    const carrito = obtenerCarrito();
    const item = carrito.find(i => i.nombre === nombre);
    if (!item) return;

    const nuevaCantidad = Number(inputElemento.value);
    item.cantidad = nuevaCantidad > 0 ? nuevaCantidad : 1;
    guardarCarrito(carrito);
    renderCarrito();
}

// Se llama al cargar carrito.html
function renderCarrito() {
    const tbody = document.getElementById("tabla_carrito_body");
    if (!tbody) return;

    const carrito = obtenerCarrito();
    tbody.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {
        tbody.innerHTML = "<tr><td colspan='5'>Tu carrito está vacío.</td></tr>";
    } else {
        carrito.forEach(item => {
            const subtotal = item.precio * item.cantidad;
            total += subtotal;
            tbody.innerHTML += `
                <tr>
                    <td>${item.nombre}</td>
                    <td>$${item.precio.toLocaleString("es-CL")}</td>
                    <td><input type="number" value="${item.cantidad}" min="1" style="width:50px" onchange="cambiarCantidad('${item.nombre}', this)"></td>
                    <td>$${subtotal.toLocaleString("es-CL")}</td>
                    <td><button type="button" onclick="eliminarDelCarrito('${item.nombre}')">Eliminar</button></td>
                </tr>
            `;
        });
    }

    const totalElemento = document.getElementById("carrito_total");
    if (totalElemento) totalElemento.textContent = "$" + total.toLocaleString("es-CL");
}

document.addEventListener("DOMContentLoaded", renderCarrito);
