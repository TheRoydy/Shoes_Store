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
      //success: funcion que se ejecuta
      //cuando la peticion tiene exito
      console.log(result);

      var cuerpoTabla = document.getElementById("cuerpoTabla");
      //Se limpia el cuepro de la tabla
      cuerpoTabla.innerHTML = "";
      //se hace un ciclo que recorra l arreglo con los datos
      for (var i = 0; i < result.length; i++) {
        //UNA ETIQUETA tr por cada registro
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

        var headerAcciones = document.getElementById("headerAcciones"); // Suponiendo que tengas un ID para el encabezado de la columna "Acciones"
        headerAcciones.style.textAlign = "center";


        let botonEditarProducto = document.createElement("button");
        botonEditarProducto.value = result[i]["id_producto"];
        botonEditarProducto.innerHTML = "Editar";
        botonEditarProducto.onclick = function (e) {
          $('#exampleModal').modal('show');
          consultarProductoID(this.value);
        }
        botonEditarProducto.className = "btn btn-warning editar_producto";

        let botonEliminar = document.createElement("button");
        botonEliminar.value = result[i]["id_cliente"];
        botonEliminar.innerHTML = "Eliminar";
        botonEliminar.onclick = function (e) {
          $('#exampleModal').modal('show');
          consultarProductoID(this.value);
        }
        botonEliminar.className = "btn btn-danger eliminar";

        let botonCambiar_estado = document.createElement("button");
        botonCambiar_estado.value = result[i]["id_cliente"];
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

        // Asignación de los botones a la celda de "Acciones"
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
        trResgistro.appendChild(celdaAcciones); // Agregar la celda de "Acciones" a la fila

        cuerpoTabla.appendChild(trResgistro);

        //creamos un td por cada campo de resgistro

      }
    },
    error: function (error) {
      /*
      ERROR: funcion que se ejecuta cuando la peticion tiene un error
      */
      alert("Error en la petición " + error);
    }
  })

  function consultarProductoID(id) {
    //alert(id);
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

}

/*function validarCampos() {
  // Obtener los valores de los campos
  var tipo_identificacion = document.getElementById("tipo_identificacion").value;
  var identificacion = document.getElementById("identificacion").value;
  var nombre_cliente = document.getElementById("nombre_cliente").value;
  var apellido_cliente = document.getElementById("apellido_cliente").value;
  var telefono = document.getElementById("telefono").value;
  var direccion = document.getElementById("direccion").value;
  var ciudad = document.getElementById("ciudad").value;
  var correo_electronico = document.getElementById("correo_electronico").value;
  var estado = document.getElementById("estado").value;

  // Verificar si algún campo está vacío
  if (tipo_identificacion === '' || identificacion === '' || nombre_cliente === '' || apellido_cliente === '' || telefono === '' || direccion === '' || ciudad === ''|| correo_electronico === ''  || estado === '') {
    return false; // Al menos un campo está vacío
  } else {
    return true; // Todos los campos están llenos
  }
}*/

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


//validarNombre
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
//ValidadDescripcion
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

//ValidadCantidad
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

//ValidadPrecio
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

//ValidadIVA
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

//ValidadDescuento
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

