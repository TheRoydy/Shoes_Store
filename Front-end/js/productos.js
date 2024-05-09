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


        let celdaOpcion = document.createElement("td");
        let botonEditarProducto = document.createElement("button");
        botonEditarProducto.value = result[i]["id_producto"];
        botonEditarProducto.innerHTML = "Editar";


        botonEditarProducto.onclick = function (e) {
          $('#exampleModal').modal('show');
          consultarProductoID(this.value);
        }
        botonEditarProducto.className = "btn btn-warning editar-cliente";

        celdaID_Producto.innerText = result[i]["id_producto"];
        celdaNombre_Producto.innerText = result[i]["nombre_producto"];
        celdaDescripcion.innerText = result[i]["descripcion"];
        celdaCantidad.innerText = result[i]["cantidad"];
        celdaPrecio.innerText = result[i]["precio"];
        celdaIVA.innerText = result[i]["porcentaje_iva"];
        celdaDescuento.innerText = result[i]["porcentaje_descuento"];
        celdaEstado.innerText = result[i]["estado"];
        celdaAcciones.innerText = result[i]["acciones"];



        trResgistro.appendChild(celdaID_Producto);
        trResgistro.appendChild(celdaNombre_Producto);
        trResgistro.appendChild(celdaDescripcion);
        trResgistro.appendChild(celdaCantidad);
        trResgistro.appendChild(celdaPrecio);
        trResgistro.appendChild(celdaIVA);
        trResgistro.appendChild(celdaDescuento);
        trResgistro.appendChild(celdaAcciones);



        celdaOpcion.appendChild(botonEditarProducto);
        trResgistro.appendChild(celdaOpcion)


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
        limpiarCliente();
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

  function validarCampos() {
    var identificacion = document.getElementById("identificacion");
    return validarIdentificacion(identificacion);
  }
  function validarIdentificacion(cuadroNumero) {
    /*
    numero documento 
    min=5
    max=11
    numero entero
  
    si cumple, se cambia color a verde
    si no, se cambia a rojo
    */
    var valor = cuadroNumero.value;
    var valido = true;
    if (valor.length < 5 || valor.length > 11) {
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

  //validarNombre
  function validarCampos() {
    var nombre_cliente = document.getElementById("nombre_cliente");
    return validarNombre_Cliente(nombre_cliente);
  }
  function validarNombre_Cliente(cuadroNumero) {

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
  //ValidadApellido
  function validarCampos() {
    var apellido_cliente = document.getElementById("apellido_cliente");
    return validarApellido_Cliente(apellido_cliente);
  }
  function validarApellido_Cliente(cuadroNumero) {

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

  //ValidadTelefono
  function validarCampos() {
    var telefono = document.getElementById("telefono");
    return validarTelefono(telefono);
  }
  function validarTelefono(cuadroNumero) {

    var valor = cuadroNumero.value;
    var valido = true;
    if (valor.length < 10 || valor.length > 15) {
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
    var direccion = document.getElementById("direccion");
    return validarDireccion(direccion);
  }
  function validarDireccion(cuadroNumero) {

    var valor = cuadroNumero.value;
    var valido = true;
    if (valor.length < 10 || valor.length > 200) {
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
    var ciudad = document.getElementById("ciudad");
    return validarCiudad(ciudad);
  }
  function validarCiudad(cuadroNumero) {

    var valor = cuadroNumero.value;
    var valido = true;
    if (valor.length < 10 || valor.length > 200) {
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

  //ValidadCorreo
  function validarCampos() {
    var correo_electronico = document.getElementById("correo_electronico");
    return validarCorreo_Electronico(correo_electronico);
  }
  function validarCorreo_Electronico(cuadroNumero) {

    var valor = cuadroNumero.value;
    var valido = true;
    if (valor.length < 5 || valor.length > 100) {
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
  //ValidadDireccion


  function validarCampos() {
    var estado = document.getElementById("estado");
    return validarEstado(estado);
  }
  function validarEstado(cuadroNumero) {

    var valor = cuadroNumero.value;
    var valido = true;
    if (valor.length < 1 || valor.length > 1) {
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


}