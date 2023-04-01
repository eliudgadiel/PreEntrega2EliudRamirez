// inicio de la pagina
// aplicando alert y prompt y Funciones

function bienvenida() {
    let nombre =  prompt("¿Cómo te llamas?");
    alert("Bienvenido " + nombre.toUpperCase() + " a Look Fashion estamos en el mes de descuento. Comprando mas de 10.000 pesos  en Ropa hay un 20% off ");
  }
  bienvenida();
  
  //aplicando Ciclos
  
   let ropa = prompt("¿Que tipo de ropa quieres ver? de invierno, primavera, otoño o verano");
  
  switch (ropa) {
     
     case 'invierno':
        alert("Esta son las ropa de Invierno");
        console.log("Esta son las ropa de Invierno");
        break;
        
        case 'primavera':
        alert("Esta son las ropa de Primavera");
        console.log("Esta son las ropa de Primavera");
        break;
  
        case 'otoño':
           alert("Esta son las ropa de Otoño");
           console.log("Esta son las ropa de Otoño");
           break;
  
           case 'verano':
         alert("Esta son las ropa de Verano");
         console.log("Esta son las ropa de Verano");
           break;
     default:
        alert("Ingrese algunas de las 4 Alternativa que Tiene gracias")
        break;    
  };
  
  
  //aplicando control de flujos 
  
  let compra = parseInt (prompt("ingrese el precio de la ropa que quiere comprar"));
  let porcentaje = 20;
  let descuento = 0;
  let precio = compra;
  let total = precio;
  if (compra >= 10000) {
     alert("usted tiene el 20% descuento ");
     console.log("usted tiene el 20% de descuento ");
     if (porcentaje > 0) {
        descuento = precio * (porcentaje/100)
     }
     total = precio - descuento;
     console.log("el valor final del producto es de " + total);
     alert("Gracias por su Compra espero que regrese Pronto. Debe Abonar " + total);
     
  } else { 
     alert("Usted no obtuvo el 20% descuento ");
     alert("Gracias por su Compra espero que regrese Pronto. Debe Abonar " + compra) 
     console.log("usted no obtuvo el 20% descuento debe Abonar " + compra); 
  } 
  