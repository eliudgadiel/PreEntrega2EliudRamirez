window.addEventListener("load", () => {
  const ProductosDeCompra = document.querySelector(".Productos-tabla");
  const tablaGuardada = localStorage.getItem("tablaCarrito");
  if (tablaGuardada) {
    ProductosDeCompra.innerHTML = tablaGuardada;
  }
});

 const botonCompra = document.querySelectorAll(".boton-compra")

 // el carrito
 let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

console.log(carrito);

botonCompra.forEach(CarroBoton => {
  CarroBoton.addEventListener("click", clickBoton);
});

const ProductosDeCompra = document.querySelector(".Productos-tabla");

// Aplico Evento 
 
function clickBoton(event) {
  const boton = event.target;
  const item = boton.closest(".producto");
  const itemTitulo = item.querySelector(".producto-titulo").textContent;
  const itemPrecio = item.querySelector(".precio").textContent;
  itemCompra(itemTitulo, itemPrecio)
}

// Aplico el DOM

function itemCompra(itemTitulo, itemPrecio){
const tablaDeCompra = document.createElement("tr");
const contenidoCompra = `
<tr>
<th class="Titulo-Compra" scope="row">${itemTitulo}</th>
<td class="precio">${itemPrecio}</td>
<td class="Cantidades"><input type="number" class="cantidad" value="1"></td>
<td><button class="eliminar-btn">Eliminar</button></td>
</tr>
`;
tablaDeCompra.innerHTML = contenidoCompra;
ProductosDeCompra.append(tablaDeCompra);

carrito.push({
  titulo: itemTitulo,
  precio: itemPrecio
});
saveLocal();
 totalDeCompra(); 

 const eliminarBtn = tablaDeCompra.querySelector(".eliminar-btn");
 eliminarBtn.addEventListener("click", () => {
   eliminarProducto(itemTitulo);
}); 
}

// suma de los prodcutos de la compra
 function totalDeCompra(){
  let total = 0;
  compraTotal = document.querySelector(".compra-Total");
  
  const todosLosProductos = document.querySelectorAll(".Productos-tabla");
  
  todosLosProductos.forEach((todosLosProducto) => {
  const precioDeCadaUno = todosLosProducto.querySelector(".precio");
 
  const SoloPRecio = Number(precioDeCadaUno.textContent.replace("$",""));

  const cantidadDeProductos = todosLosProducto.querySelector(".cantidad");

 const cantidadResultado = Number(cantidadDeProductos.value);
total = total + SoloPRecio * cantidadResultado;

compraTotal.textContent = `$${total.toFixed(2)}`;
  });
 
};

//Guardar en el local Storage 

 const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify (carrito));
  localStorage.setItem("tablaCarrito", ProductosDeCompra.innerHTML);
}; 






