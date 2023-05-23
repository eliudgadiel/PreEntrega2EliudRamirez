//API JSON URL
const API_URL = "https://jsonplaceholder.typicode.com";

//Guardar en el local Storage

const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  localStorage.setItem("#lista-carrito tbody", lista.innerHTML);
};

const lista = document.querySelector("#lista-carrito tbody");
//el carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

window.addEventListener("load", () => {
  let carritoGuardado = [];
  if (lista) {
    carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    carritoGuardado.forEach((producto) => {
      const nuevaFila = crearFilaProducto(producto);
      lista.appendChild(nuevaFila);
    });
    totalDeCompra();
  }
});

const botonCompra = document.querySelectorAll(".boton-compra");

botonCompra.forEach((botonCompra) => {
  botonCompra.addEventListener("click", clickBoton);
});

const botonVaciarCarrito = document.querySelector("#vaciar-carrito");
botonVaciarCarrito.addEventListener("click", vaciarCarrito);

const ProductosDeCompra = document.querySelector("#carrito-1");

// Aplico Evento

function clickBoton(event) {
  const boton = event.target;
  const item = boton.closest(".producto");
  const itemTitulo = item.querySelector(".producto-titulo").textContent;
  const itemPrecio = parseFloat(
    item.querySelector(".precio").textContent.replace("$", "")
  );
  const itemImg = item.querySelector(".img").src;
  const itemId = item.querySelector("div").getAttribute("data-id");
  itemCompra(itemTitulo, itemPrecio, itemImg, itemId);
}
// Asignar evento de eliminación
lista.addEventListener("click", function (event) {
  if (event.target.classList.contains("borrar")) {
    event.preventDefault();
    const itemId = event.target.getAttribute("data-id");
    eliminarProducto(itemId);
  }
});

// Función para obtener la cantidad de un producto en el carrito
function itemCompra(itemTitulo, itemPrecio, itemImg, itemId) {
  let productoExistente = carrito.find((producto) => producto.id === itemId);

  if (productoExistente) {
    productoExistente.cantidad++;
    productoExistente.precio += itemPrecio;
    const filaExistente = document.querySelector(`#fila-${itemId}`);
    const cantidadElemento = filaExistente.querySelector(".cantidad");
    const precioElemento = filaExistente.querySelector(".preCio");

    if (cantidadElemento && precioElemento) {
      cantidadElemento.textContent = productoExistente.cantidad;
      precioElemento.textContent = productoExistente.precio.toFixed(2);
    }
  } else {
    const nuevoProducto = {
      titulo: itemTitulo,
      precio: itemPrecio,
      imagen: itemImg,
      id: itemId,
      cantidad: 1,
    };
    carrito.push(nuevoProducto);
    const lista = document.querySelector("#lista-carrito tbody");
    if (lista) {
      const nuevaFila = crearFilaProducto(nuevoProducto);
      lista.appendChild(nuevaFila);
    }
  }

  saveLocal();
  totalDeCompra();

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: "success",
    title: "Producto agregado al carrito",
  });
}

function crearFilaProducto(producto) {
  const row = document.createElement("tr");
  const filaId = `fila-${producto.id}`;
  row.setAttribute("id", filaId);
  const contenidoCompra = `
    <td>
      <img src="${producto.imagen}" width="50">
    </td>
    <td>${producto.titulo}</td>
    <td class="cantidad">${producto.cantidad}</td>
    <td class="preCio">${producto.precio}</td>
    <td>
      <a href="#" class="borrar" data-id="${producto.id}">X</a>
    </td>
  `;
  row.innerHTML = contenidoCompra;
  return row;
}

// suma de los prodcutos de la compra
function totalDeCompra() {
  let total = 0;
  for (let i = 0; i < carrito.length; i++) {
    const producto = carrito[i];
    const precio = parseFloat(producto.precio.toString().replace("$", ""));
    if (!isNaN(precio)) {
      total += precio;
    }
  }
  const totalElemento = document.querySelector(".Total");
  if (totalElemento) {
    totalElemento.textContent = total.toFixed(2);
  }
  return total.toFixed(2);
}

// Importar la clase DateTime de Luxon
const { DateTime } = luxon;

// Obtener la fecha actual en el formato localizado
function obtenerFecha() {
  const fecha = DateTime.now()
    .setLocale("es")
    .toLocaleString(DateTime.DATE_FULL);
  return fecha;
}

// Obtener usuarios desde la API
function obtenerUsuarios() {
  return fetch(`${API_URL}/users`)
    .then((response) => response.json())
    .then((users) => {
      return users;
    })
    .catch((error) => {
      console.error("Error al obtener los usuarios:", error);
    });
}

// Obtener los detalles de la orden
const order = () => {
  let message = "";
  carrito.forEach((e) => {
    const { cantidad, titulo, precio } = e;
    message += `<p>(x${cantidad}) - ${titulo} - ${precio}</p>`;
  });
  return message;
};

// Obtener usuarios desde la API
async function obtenerUsuarios() {
  try {
    const response = await fetch(`${API_URL}/users`);
    const users = await response.json();
    return users;
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
  }
}

// Obtener usuario aleatorio
function obtenerUsuarioAleatorio(users) {
  const indiceAleatorio = Math.floor(Math.random() * users.length);
  return users[indiceAleatorio];
}

// Procesar el pago
async function procesarPago() {
  try {
    const users = await obtenerUsuarios();
    const usuario = obtenerUsuarioAleatorio(users);
    const fecha = obtenerFecha();
    const orderDetails = order();

    Swal.fire({
      icon: "success",
      title: "Compra realizada con éxito",
      html: `
        Orden: ${orderDetails}
        Nombre: ${usuario.name}<br>
        Teléfono: ${usuario.phone}<br>
        Correo: ${usuario.email}<br>
        Ciudad: ${usuario.address.city}<br>
        Fecha: ${fecha}
      `,
      didClose: () => {
        vaciarCarrito();
      },
    });
  } catch (error) {
    console.error("Error al procesar el pago:", error);
  }
}

// evento de pagar
const botonPagar = document.querySelector("#pagar");
botonPagar.addEventListener("click", procesarPago);

function showCart() {
  const lista = document.querySelector("#lista-carrito tbody");
  lista.innerHTML = "";

  carrito.forEach((producto) => {
    const nuevaFila = crearFilaProducto(producto);
    lista.appendChild(nuevaFila);
  });

  totalDeCompra();
}

// Filtrar el carrito para obtener todos los productos excepto el que se quiere eliminar
function eliminarProducto(itemId) {
  carrito = carrito.filter((producto) => producto.id !== itemId);

  saveLocal();

  const filaEliminar = event.target.closest("tr");
  if (filaEliminar) {
    filaEliminar.remove();
  }

  totalDeCompra();

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: "error",
    title: "Producto Eliminado del Carrito",
  });
}

// Vaciar el carrito
function vaciarCarrito() {
  carrito = [];

  lista.innerHTML = "";

  saveLocal();

  totalDeCompra();
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: "success",
    title: "El Carrito Esta Vacio",
  });
}
