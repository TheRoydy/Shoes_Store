var url = "http://localhost:8080/api/v1/productos/";

function listarProductos() {
  //METODO PARA LISTAR LOS CLIENTES
  //SE CREA LA PETICION AJAX
  var capturarFiltro = document.getElementById("inputSearch").value;
  var urlLocal = url;
  if (capturarFiltro != "") {
    urlLocal += "busquedafiltro/" + capturarFiltro;
  }
  $.ajax({
    url: urlLocal,
    type: "GET",
    success: function (result) {
      console.log(result);

      var cuerpoTabla = document.getElementById("cuerpoTabla");
      cuerpoTabla.innerHTML = "";
      for (var i = 0; i < result.length; i++) {
        var trResgistro = document.createElement("tr");

        var celdaID_Producto = document.createElement("td");
        let celdaNombre_Producto = document.createElement("td")
        let celdaDescripcion = document.createElement("td")
        let celdaCantidad = document.createElement("td")
        let celdaPrecio = document.createElement("td")
        let celdaIVA = document.createElement("td")
        let celdaDescuento = document.createElement("td")
        let celdaEstado = document.createElement("td")
        let celdaAcciones = document.createElement("td")
        celdaAcciones.style.textAlign = "center";

        var botonEditarProducto = document.createElement("button");
        botonEditarProducto.value = result[i]["id_producto"];
        botonEditarProducto.innerHTML = "Editar";
        botonEditarProducto.onclick = function (e) {
          $('#exampleModal').modal('show');
          consultarProductoID(this.value);
        }
        botonEditarProducto.className = "btn btn-warning editar_producto";

        let botonEliminar = document.createElement("button");
        botonEliminar.value = result[i]["id_producto"];
        botonEliminar.innerHTML = "Eliminar";
        botonEliminar.onclick = function (e) {
          eliminarProducto(this.value);
        }
        botonEliminar.className = "btn btn-danger eliminar";

        var botonCambiar_estado = document.createElement("button");
        botonCambiar_estado.value = result[i]["id_producto"];
        botonCambiar_estado.innerHTML = "Estado";
        botonCambiar_estado.onclick = function (e) {
          $('#exampleModal').modal('show');
          consultarClienteID(this.value);
        }
        botonCambiar_estado.className = "btn btn-primary cambiar_estado";

        celdaID_Producto.innerText = result[i]["id_producto"];
        celdaNombre_Producto.innerText = result[i]["nombre_producto"];
        celdaDescripcion.innerText = result[i]["descripcion"];
        celdaCantidad.innerText = result[i]["cantidad"];
        celdaPrecio.innerText = result[i]["precio"];
        celdaIVA.innerText = result[i]["porcentaje_iva"];
        celdaDescuento.innerText = result[i]["porcentaje_descuento"];
        celdaEstado.innerText = result[i]["estado"];

        celdaAcciones.appendChild(botonEditarProducto);
        celdaAcciones.appendChild(botonEliminar);
        celdaAcciones.appendChild(botonCambiar_estado);

        trResgistro.appendChild(celdaID_Producto);
        trResgistro.appendChild(celdaNombre_Producto);
        trResgistro.appendChild(celdaDescripcion);
        trResgistro.appendChild(celdaCantidad);
        trResgistro.appendChild(celdaPrecio);
        trResgistro.appendChild(celdaIVA);
        trResgistro.appendChild(celdaDescuento);
        trResgistro.appendChild(celdaEstado);
        trResgistro.appendChild(celdaAcciones);

        cuerpoTabla.appendChild(trResgistro);
      }
    },
    error: function (error) {
      alert("Error en la petición " + error);
    }
  });
}

function consultarProductoID(id) {
  $.ajax({
    url: url + id,
    type: "GET",
    success: function (result) {
      document.getElementById("id_producto").value = result["id_producto"];
      document.getElementById("nombre_producto").value = result["nombre_producto"];
      document.getElementById("descripcion").value = result["descripcion"];
      document.getElementById("cantidad").value = result["cantidad"];
      document.getElementById("precio").value = result["precio"];
      document.getElementById("porcentaje_iva").value = result["porcentaje_iva"];
      document.getElementById("porcentaje_descuento").value = result["porcentaje_descuento"];
      document.getElementById("estado").value = result["estado"];
      document.getElementById("acciones").value = result["acciones"];

    }
  });
}

function eliminarProducto(id) {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "¡Seguro que quieres eliminar esto, una vez eliminado no se podrá recuperar este registro!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminarlo!"
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: url + id,
        type: "DELETE",
        success: function (result) {
          Swal.fire(
            "¡Eliminado!",
            "El producto ha sido eliminado correctamente.",
            "success"
          );
          listarProductos(); // Recargar la lista después de eliminar
        },
        error: function (error) {
          Swal.fire("Error", "Error al eliminar el producto, " + error.responseText, "error");
        }
      });
    }
  });
}

function registrarProductos() {
  let formData = {
    "nombre_producto": document.getElementById("nombre_producto").value,
    "descripcion": document.getElementById("descripcion").value,
    "cantidad": document.getElementById("cantidad").value,
    "precio": document.getElementById("precio").value,
    "porcentaje_iva": document.getElementById("porcentaje_iva").value,
    "porcentaje_descuento": document.getElementById("porcentaje_descuento").value,
    "estado": document.getElementById("estado").value
  };

  let camposValidos = true;
  let camposRequeridos = [
    "nombre_producto",
    "descripcion",
    "cantidad",
    "precio",
    "porcentaje_iva",
    "porcentaje_descuento",
    "estado"
  ];

  camposRequeridos.forEach(function (campo) {
    let valorCampo = document.getElementById(campo).value.trim();
    if (valorCampo === "") {
      camposValidos = false;
      return false; // Terminar la iteración si se encuentra un campo vacío
    }
  });

  if (camposValidos) {
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      success: function (result) {
        Swal.fire({
          title: "¡Excelente!",
          text: "Se guardó correctamente",
          icon: "success"
        });
        limpiarProducto();
      },
      error: function (error) {
        Swal.fire("Error", "Error al guardar, " + error.responseText, "error");
      },
    });

  } else {
    Swal.fire({
      title: "¡Error!",
      text: "Llene todos los campos correctamente",
      icon: "error"
    });
  }
}

function validarCampos() {
  var nombre_producto = document.getElementById("nombre_producto");
  return validarNombre_Producto(nombre_cliente);
}

function validarNombre_Producto(cuadroNumero) {
  var valor = cuadroNumero.value;
  var valido = true;
  if (valor.length < 1 || valor.length > 20) {
    valido = false
  }

  if (valido) {
    //cuadro de texto cumple
    cuadroNumero.className = "form-control is-valid";
  } else {
    //cuadro de texto no cumple
    cuadroNumero.className = "form-control is-invalid";
  }
  return valido;
}

function validarCampos() {
  var descripcion = document.getElementById("descripcion");
  return validarDescripcion(descripcion);
}

function validarDescripcion(cuadroNumero) {
  var valor = cuadroNumero.value;
  var valido = true;
  if (valor.length < 1 || valor.length > 11) {
    valido = false
  }

  if (valido) {
    //cuadro de texto cumple
    cuadroNumero.className = "form-control is-valid";
  } else {
    //cuadro de texto no cumple
    cuadroNumero.className = "form-control is-invalid";
  }
  return valido;

}

function validarCampos() {
  var cantidad = document.getElementById("cantidad");
  return validarCantidad(cantidad);
}

function validarCantidad(cuadroNumero) {
  var valor = cuadroNumero.value;
  var valido = true;
  if (valor.length < 1 || valor.length > 15) {
    valido = false
  }

  if (valido) {
    //cuadro de texto cumple
    cuadroNumero.className = "form-control is-valid";
  } else {
    //cuadro de texto no cumple
    cuadroNumero.className = "form-control is-invalid";
  }
  return valido;

}

function validarCampos() {
  var precio = document.getElementById("precio");
  return validarPrecio(precio);
}

function validarPrecio(cuadroNumero) {
  var valor = cuadroNumero.value;
  var valido = true;
  if (valor.length < 1 || valor.length > 999999999) {
    valido = false
  }

  if (valido) {
    //cuadro de texto cumple
    cuadroNumero.className = "form-control is-valid";
  } else {
    //cuadro de texto no cumple
    cuadroNumero.className = "form-control is-invalid";
  }
  return valido;

}

function validarCampos() {
  var porcentaje_iva = document.getElementById("porcentaje_iva");
  return validarIVA(porcentaje_iva);
}

function validarIVA(cuadroNumero) {
  var valor = cuadroNumero.value;
  var valido = true;
  if (valor.length < 1 || valor.length > 100) {
    valido = false
  }

  if (valido) {
    //cuadro de texto cumple
    cuadroNumero.className = "form-control is-valid";
  } else {
    //cuadro de texto no cumple
    cuadroNumero.className = "form-control is-invalid";
  }
  return valido;

}

function validarCampos() {
  var porcentaje_descuento = document.getElementById("porcentaje_descuento");
  return validarDescuento(porcentaje_descuento);
}

function validarDescuento(cuadroNumero) {
  var valor = cuadroNumero.value;
  var valido = true;
  if (valor.length < 1 || valor.length > 100) {
    valido = false
  }

  if (valido) {
    //cuadro de texto cumple
    cuadroNumero.className = "form-control is-valid";
  } else {
    //cuadro de texto no cumple
    cuadroNumero.className = "form-control is-invalid";
  }
  return valido;

}

function validarCampos() {
  var estado = document.getElementById("estado");
  return validarEstado(estado);
}

function validarEstado(cuadroNumero) {
  var valor = cuadroNumero.value;
  var valido = true;
  if (valor.length < 1 || valor.length > 11) {
    valido = false
  }

  if (valido) {
    //cuadro de texto cumple
    cuadroNumero.className = "form-control is-valid";
  } else {
    //cuadro de texto no cumple
    cuadroNumero.className = "form-control is-invalid";
  }
  return valido;

}

function limpiarFormulario() {
  document.getElementById("nombre_producto").className = "form-control";
  document.getElementById("descripcion").className = "form-control";
  document.getElementById("cantidad").className = "form-control";
  document.getElementById("precio").className = "form-control";
  document.getElementById("porcentaje_iva").className = "form-control";
  document.getElementById("porcentaje_descuento").className = "form-control";
  document.getElementById("estado").className = "form-select";
  document.getElementById("nombre_producto").value = "";
  document.getElementById("descripcion").value = "";
  document.getElementById("cantidad").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("porcentaje_iva").value = "";
  document.getElementById("porcentaje_descuento").value = "";
  document.getElementById("estado").value = "";
}
