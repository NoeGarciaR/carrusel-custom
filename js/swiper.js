class CarruselCustom {
  selectorContendorPrincipal;
  selectorProducto;
  selectorPaginacionSiguiente;
  selectorPaginacionAnterior;
  selectorDotsPaginacion;

  productos;
  paginacionSiguiente;
  paginacionAnterior;

  _claseProductoSeleccionado = 'producto-seleccionado';
  _atributoProductoIndex = 'producto-index';
  _atributoDireccionPaginacion = 'direccion';

  indexActual = 0;
  separacionEntreProductos = 30;

  constructor(
    selectorContenedorPrincipal,
    selectorProducto,
    selectorPaginacionSiguiente, 
    selectorPaginacionAnterior,
    selectorDotsPaginacion,
    separacionEntreProductos
    ) {
    this.selectorContendorPrincipal = selectorContenedorPrincipal;
    this.selectorProducto = selectorProducto;
    this.selectorPaginacionSiguiente = selectorPaginacionSiguiente;
    this.selectorPaginacionAnterior = selectorPaginacionAnterior;
    this.selectorDotsPaginacion = selectorDotsPaginacion;
    this.separacionEntreProductos = separacionEntreProductos;

    this.productos = document.querySelectorAll(this.selectorProducto);
    this.paginacionSiguiente = document.querySelector(this.selectorPaginacionSiguiente);
    this.paginacionAnterior = document.querySelector(this.selectorPaginacionAnterior);

    this.barridoInicial();
  }

  // Barrido inicial de las imagenes
  barridoInicial() {
    let index = 0;
    for (const producto of this.productos.entries()) {
      // agregamos liteners
      producto[1].addEventListener("click", (event) => {
        let index = event.currentTarget.getAttribute(this._atributoProductoIndex);
        this.seleccionarProductoConIndex(Number(index));
      });
      // agregamos atributo index
      producto[1].setAttribute(this._atributoProductoIndex, String(index));
      index++;
  
      producto[1].style.marginRight = `${this.separacionEntreProductos}px`;
    }
  
    // eliminando el margin right del ultimo elemento
    this.productos[this.productos.length - 1].style.marginRight = '0px';
  
  
    // Barrido de la paginacion
    this.paginacionAnterior.setAttribute(this._atributoDireccionPaginacion, 'izquierda');
    this.paginacionSiguiente.setAttribute(this._atributoDireccionPaginacion, 'derecha');

    this.paginacionAnterior.addEventListener("click", (event) => {
      this.accionClickIconoPaginacion(event);
    });
    this.paginacionSiguiente.addEventListener("click", (event) => {
      this.accionClickIconoPaginacion(event);
    });
  }

  eliminarClase(clase) {
    for (const producto of this.productos.entries()) {
      producto[1].classList.remove(clase);
    }
  }

  // seleccionarProducto(event) {
  //   eliminarClase(this._claseProductoSeleccionado);
  //   let _contenedor = event.target.parentElement;
  //   _contenedor.classList.add(this._claseProductoSeleccionado);
  //   tarjetProductoActual = productos[indexActual];
  // }

  seleccionarProductoConIndex(index) {
    this.eliminarClase(this._claseProductoSeleccionado);
    let _index = index;
    /** Simulamos un bucle */
    // intentamos acceder a un producto despues del ultimo
    // reiniciamos el contador
    if (index > this.productos.length - 1) {
      _index = 0;
    }
    // estamos en el primer producto y queremos acceder a un producto antes
    // seleccionamos el ultimo producto
    if (index === -1) {
      _index = this.productos.length - 1;
    }
    // seleccionamos el producto especifico
    this.productos[_index].classList.add(this._claseProductoSeleccionado);
    this.indexActual = _index;
  }

  accionClickIconoPaginacion(event) {
    let direccion = event.target.getAttribute(this._atributoDireccionPaginacion);
      let nuevoIndex = this.indexActual;
      if (direccion === 'derecha') {
        nuevoIndex++;
      } else {
        nuevoIndex--;
      }
    this.seleccionarProductoConIndex(nuevoIndex);
  }
}

