// inicio de la pagina
// aplicando alert y prompt y Funciones
 
function bienvenida() {
   let nombre =  prompt("¿Cómo te llamas?");
   alert("Bienvenido " + nombre.toUpperCase() + " a Look Fashion estamos en el mes de descuento. Comprando mas de 900 pesos  en Ropa hay un 10% off ");
 }
 bienvenida();
 
 //aplicando Ciclos
 
 let respuesta = "SI";
 let valor = 0
 do {
   ropa = parseInt(prompt("Elije lo Que Andas buscando 1-Short 2-Camisa 3-Pantalon 4-Remera 5-Buso 6-Campera 7-Zapato 8-Media 9-Calza 10-Botas"));
   switch (ropa) {
      
    case 1:
       alert(" Short Precio: 800");
       valor = 805,25
       console.log("short");
       break;
       
       case 2:
       alert("Camisa ");
       valor = 103,5
       console.log("camisa");
       break;
 
       case 3:
          alert(" Pantalon ");
          valor = 1506,5
          console.log("pantalon");
          break;
 
          case 4:
        alert(" Remera ");
        valor = 905,55
        console.log("remera");
          break;
          
            case 5:
        alert(" Buso ");
        valor = 705,33
        console.log("buso");
          break;
 
          case 6:
        alert("Campera ");
        valor = 2015,12
        console.log("campera");
          break;
          
          case 7:
        alert(" Zapato ");
          valor = 950,14
        console.log("zapato");
          break;
         
          case 8:
        alert("Medias ");
        valor = 308,14
        console.log("media");
          break;
          
          case 9:
        alert(" Calza ");
        valor = 500,66
        console.log("calza");
          break;
          
          case 10:
        alert(" Botas");
        valor = 1009,99
        console.log("bota");
          break;  
    default:
       alert("Ingrese algunas de las 10 Alternativa que Tiene gracias")
       break;    
 };
 
 respuesta = prompt("¿Quieres seguir añadiendo más productos? SI/NO");
 
 } while (respuesta.toUpperCase() !== "NO");
 
  //aplicando control de flujos 
 
 let suma = 0
 suma = valor + valor 
 console.log(suma)
 
 compra = valor 
 let porcentaje = 10;
 let descuento = 0;
 let precio = compra;
 let total = precio;
 if (precio >= 900) {
    alert("usted tiene el 10% descuento ");
    console.log("usted tiene el 10% de descuento ");
    if (porcentaje > 0) {
       descuento = precio * (porcentaje/100)
    }
    total = precio - descuento;
    console.log("el valor final del producto es de " + total);
    alert("Gracias por su Compra espero que regrese Pronto. Debe Abonar " + total);
    
 } else { 
    alert("Usted no obtuvo el 10% descuento ");
    alert("Gracias por su Compra espero que regrese Pronto. Debe Abonar " + compra) 
    console.log("usted no obtuvo el 10% descuento debe Abonar " + compra); 
 }    
 
 
 // Aaplicando objeto. Inventario de prodcutos
 
     class Inventario {
     constructor(nombre, talla, cantidad) {
     this.nombre = nombre;
     this.talla = talla;
     this.cantidad = parseInt(cantidad);
     this.hayInvenatrio = !!parseInt(cantidad);
   }
     toString() {
     return this.nombre;
   }
     incrementarStock(cantidadIncrementada) {
     this.cantidad = this.cantidad + parseInt(cantidadIncrementada);
   }
     vendi(ventaDeProducto) {
     this.cantidad = this.cantidad - parseInt(ventaDeProducto);
   }
 }
 
 let Remera = new Inventario("remera", "S", 2);
 console.log(" remera talla S", Remera);
 console.log(" El nombre del prodcuto es " + Remera.toString());
 Remera.incrementarStock(8);
 console.log("incremeto 8 mas remera talla S", Remera);
 Remera.vendi(3);
 console.log("En el dia de hoy vendi 3 remera talla S", Remera); 
  
 
 // Aplicando Array. en una Venta al Mayor
 
  class Producto {
   constructor(nombre, precio) {
     this.nombre = nombre.toUpperCase();
     this.precio = parseFloat(precio);
     this.vendido = false;
   }
 }
 
 let LosProductos = [ 
   new Producto ("Short" , 802,25),
   new Producto ("Camisa" , 1056,50),
   new Producto ("Pantalon" , 1500,30),
   new Producto ("Remera" , 960,29),
   new Producto ("Buso" , 700,59),
   new Producto ("Campera" , 2621,60),
   new Producto ("Zapato" , 950,72),
   new Producto ("Medias" , 305,83),
   new Producto ("Calza" , 520,98),
   new Producto ("Botas" , 1003,13) 
   ];
 
   let descuento2 = 0;
   function calcularDescuento(LosProductos, precio) {
     let descuento2 = 0;
     switch (LosProductos) {
       
       case 5: 
         descuento2 = precio * 0.05; 
         break;
       case 8: 
         descuento2 = precio * 0.15; 
         break;
       case 10: 
         descuento2 = precio * 0.25; 
         break;
       default:
     }
     return descuento2;
   }
   
 
   function calcularCostoTotal(productos = []) {
     let total = 0;
     for (const unProducto of productos) {
       total += unProducto.precio;
     }
     return total;
   }
   
   let costoTotal = calcularCostoTotal(LosProductos);
   descuento2 = calcularDescuento(LosProductos.length, costoTotal);
   costoTotal = costoTotal - descuento2;
   alert("EL comprador debe pagar la cantidad de " +
   costoTotal.toFixed(2) + " y usted recibió un descuento de " + descuento2 + " por la compra de " + LosProductos.length + " productos.");
 
 //Aplicar Funciones de oreden Superior 2, redondeo ceil 
 
   let numero = [costoTotal]
 let redondeo = Math.ceil(numero)
 console.log("El costo total es",{
 resultado: redondeo,
 });
 
 // Aplicando Funciones de orden superior 1. Como buscador de Productos
 
  let BuscarRopa = prompt.toUpperCase()("¿Qué Tipo de Ropa quieres buscar?");
 
  let productosHallados = LosProductos.filter(
   (unProducto) => unProducto.nombre.includes(BuscarRopa.toUpperCase())
 );
 alert("Ropa Encontrada " + BuscarRopa + " son: " + productosHallados.length);
 console.log("Ropa Encontrada " + BuscarRopa + " son: " + productosHallados.length); 
 