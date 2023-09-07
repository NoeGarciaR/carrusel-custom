let productos = document.querySelectorAll('.contenedor-producto');
const _claseProductoSeleccionado = 'producto-seleccionado';
const _atributoProductoIndex = 'producto-index';
let indexActual = 0;
let separacionEntreProductos = 20;

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
  productos[index].classList.add(_claseProductoSeleccionado);
}


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

// seleccionamos producto por default
seleccionarProductoConIndex(indexActual);

