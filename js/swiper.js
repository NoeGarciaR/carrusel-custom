let productos = document.querySelectorAll('.contenedor-producto');
let iconosPaginacion = document.querySelectorAll('.paginacion-carrussel img');

const _claseProductoSeleccionado = 'producto-seleccionado';
const _atributoProductoIndex = 'producto-index';
const _atributoDireccionPaginacion = 'direccion';

let indexActual = 0;
let separacionEntreProductos = 30;

const eliminarClase = (clase) => {
  for (const producto of productos.entries()) {
    producto[1].classList.remove(clase);
  }

}

const seleccionarProducto = (event) => {
  eliminarClase(_claseProductoSeleccionado);
  let _contenedor = event.target.parentElement;
  _contenedor.classList.add(_claseProductoSeleccionado);
  tarjetProductoActual = productos[indexActual];
}

const seleccionarProductoConIndex = (index) => {
  eliminarClase(_claseProductoSeleccionado);
  let _index = index;
  /** Simulamos un bucle */
  // intentamos acceder a un producto despues del ultimo
  // reiniciamos el contador
  if(index > productos.length - 1) {
    _index = 0;
  }
  // estamos en el primer producto y queremos acceder a un producto antes
  // seleccionamos el ultimo producto
  if(index === -1) {
    _index = productos.length - 1;
  }
  // seleccionamos el producto especifico
  productos[_index].classList.add(_claseProductoSeleccionado);
  indexActual = _index;
}


// Barrido inicial de las imagenes
let index = 0;
for (const producto of productos.entries()) {
  // agregamos liteners
  producto[1].addEventListener("click", (event) => {
    let index = event.currentTarget.getAttribute(_atributoProductoIndex);
    seleccionarProductoConIndex(Number(index));
  });
  // agregamos atributo index
  producto[1].setAttribute(_atributoProductoIndex, String(index));
  index++;

  producto[1].style.marginRight = `${separacionEntreProductos}px`;
}

// eliminando el margin right del ultimo elemento
productos[productos.length -1].style.marginRight = '0px';


// Barrido de la paginacion
iconosPaginacion[0].setAttribute(_atributoDireccionPaginacion, 'izquierda');
iconosPaginacion[1].setAttribute(_atributoDireccionPaginacion, 'derecha');

for (const icono of iconosPaginacion.entries()) {
  icono[1].addEventListener("click", (event) => {
    let direccion = event.target.getAttribute(_atributoDireccionPaginacion);
    let nuevoIndex = indexActual;
    if(direccion === 'derecha') {
      nuevoIndex++;
    } else {
      nuevoIndex--;
    }
    seleccionarProductoConIndex(nuevoIndex);
  });
}
// seleccionamos producto por default
seleccionarProductoConIndex(indexActual);

