window.addEventListener("load", () => {
  const lista = document.querySelector("#lista-carrito tbody");
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

const lista = document.querySelector("#lista-carrito tbody");

const botonCompra = document.querySelectorAll(".boton-compra");

// el carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

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
    const precioElemento = filaExistente.querySelector("#preCio");

    if (cantidadElemento && precioElemento) {
      cantidadElemento.textContent = productoExistente.cantidad;
      precioElemento.textContent = productoExistente.precio.toFixed(2);
    } else {
      console.log(
        "No se encontró el elemento de cantidad o precio en la fila del carrito."
      );
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

  // Mostrar notificación de éxito
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
    <td id="preCio">${producto.precio}</td>
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

const order = () => {
  let message = "";
  carrito.forEach((e) => {
    const { cantidad, titulo, precio } = e;
    message += `<p>(x${cantidad}) - ${titulo} - ${precio}</p>`;
  });
  return message;
};

const checkOutFunction = () => {
  if (carrito.length) {
    const DateTime = luxon.DateTime;
    const fecha = DateTime.now().setLocale("es").toLocaleString();
    const totalCompra = totalDeCompra();
    const ordenGenerada = order();

    Swal.fire({
      icon: "success",
      title: "¡Éxito!",
      html: `Su orden:\n${ordenGenerada} ha sido generada con éxito. \n`,
      footer: `Fecha: ${fecha} - Precio total de su orden: $${totalCompra}`,
    }).then((result) => {
      if (result.isConfirmed) {
        solicitarCorreoElectronico();
      }
    });

    carrito = [];
    saveLocal();
    showCart();
  } else {
    Swal.fire({
      icon: "error",
      title: "No hay items en el carrito",
      showConfirmButton: false,
      timer: 3000,
    });
  }
};

const solicitarCorreoElectronico = async () => {
  const { value: email } = await Swal.fire({
    title: "Ingrese su dirección de correo electrónico",
    input: "email",
    inputLabel: "Dirección de correo electrónico",
    inputPlaceholder: "Ingrese su correo electrónico",
  });

  if (email) {
    Swal.fire({
      icon: "success",
      title: "¡Correo electrónico enviado!",
      text: `Se ha enviado un correo electrónico a ${email} con los detalles de la compra.`,
      showConfirmButton: false,
      timer: 3000,
    });
  }
};

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

  // Actualizar el total de la compra
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

function vaciarCarrito() {
  // Vaciar el carrito
  carrito = [];

  // Limpiar la lista en el DOM
  lista.innerHTML = "";

  // Actualizar el almacenamiento local
  saveLocal();

  // Actualizar el total de la compra
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

//Guardar en el local Storage

const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  localStorage.setItem("#lista-carrito tbody", lista.innerHTML);
};

const botonPagar = document.querySelector("#pagar");
botonPagar.addEventListener("click", checkOutFunction);
