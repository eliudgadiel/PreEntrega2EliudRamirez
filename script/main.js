
 // inicio de la pagina
 
function bienvenida() {
  let nombre =  prompt("¿Cómo te llamas?");
  alert("Bienvenido " + nombre.toUpperCase() + " a Look Fashion estamos en el mes de descuento. Comprando 3 o Mas Productos hay un 10% off ");
  console.log(nombre);
}
bienvenida();


// Definir la clase Producto
class Producto {
  constructor(nombre, precio) {
    this.nombre = nombre.toUpperCase();
    this.precio = precio;
  }
}

// Crear algunos productos
const Catalogo = [
  new Producto ("Short" , 802,25),
  new Producto ("Camisa" , 1056,50),
  new Producto ("Pantalon" , 1500,30),
  new Producto ("Remera" , 960,29),
  new Producto ("Buso" , 700,59),
  new Producto ("Campera" , 2621,60),
  new Producto ("Zapato" , 950,72),
  new Producto ("Media" , 305,83),
  new Producto ("Calza" , 520,98),
  new Producto ("Bota" , 1003,13) 
];

// Array para los productos seleccionados

const carrito = [];

// Función para buscar un producto en el catálogo

function buscarProducto(nombre) {
  return Catalogo.find(producto => producto.nombre === nombre);
}

// Ciclo para que el usuario seleccione los productos
let comprar = "SI";
while (comprar.toLocaleUpperCase() !== "NO") {
  const nombreProducto = prompt("Ingrese el nombre del producto que desea agregar al carrito: ").toUpperCase();
  const producto = buscarProducto(nombreProducto);
  if (producto) {
    carrito.push(producto);
    alert(producto.nombre + " ha sido agregado al carrito ");
  } else {
    alert("No se ha encontrado el producto " + nombreProducto);
  }
  comprar = prompt("¿Desea agregar otro producto al carrito SI/NO?");
  console.log(nombreProducto)
}

// Calcular el total y el descuento de la compra
// Aplicar un 10% de descuento si se compran 3 o más productos
let total = 0;
carrito.forEach(producto => {
  total += producto.precio;
});
let descuento = 0;
if (carrito.length >= 3) {
  descuento = total * 0.1; 
}
const totalConDescuento = total - descuento;
console.log(totalConDescuento);
// Mostrar información de la compra
alert("Los productos seleccionados son: " + carrito.map(producto => producto.nombre).join(", ") +
" El total es: " + total +
" El descuento aplicado es: " + descuento +
" El total con descuento es: " + totalConDescuento);