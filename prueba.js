// *  ENTENDIENDO MEJOR EL ESCOPE Y EL THIS

let variableGlobal = 'hola';

{
    console.log(variableGlobal);
    // let variableGlobal = 'hola de nuevo' // ? PORQUE CUANDO CUANDO SE AGREGA ESTA LINEA DA ERROR?
}


// * Ahora si con el this:
/* 
    Lo que yo entiendo sobre el this dentro de un objeto:
    dentro de un objeto this hace referencia al objeto, en este caso si usara this.number es como si hiciera myObjeto.number
    verdad?.
    pero no me queda claro el uso de this dentro de las funciones o en los methodos.
*/

const myObjeto = {
    //? EN ESTE CASO THIS APUNTA A myObjeto, pero porque?
    numero: 0,
    contador(){ //? PORQUE NO APUNTA A CONTADOR?
        setInterval(() => { // ? PORQUE NO APUNTA A setInterval?
            console.log(++this.numero); 
        }, 1000);
    }
}

myObjeto.contador();

const myObjetoDos = {

    numero: 0,
    contador(){ 
        setInterval(function () { // ? EN ESTE CASO THIS SI HACE REFERENCIA A ESTA FUNCION ANONIMA.
            // let numero = 0; // ? PERO COMO SE USA ESTE THIS? porque asi no fuciona?
            console.log(++this.numero);
        }.bind(this), 1000); // ? Aqui le pasamos el this que hace referencia al objeto. y ahi si funciona.
    }
}

myObjetoDos.contador();


/* 
    * preguntitas:
    ? cuando usamos this en el navegador este hace referencia primero windows.
    ? entonces cuando usamos this con node a quin ase referencia al principio?.
    ? donde se puede usar this?
    ? ya te ise esta pregunta antes pero, como se usa this en las funciones?.
*/


