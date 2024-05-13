var url = "http://localhost:8080/api/v1/clientes/";

function listarClientes() {
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

        var celdaID_Cliente = document.createElement("td");
        let celdaTipo_Identificacion = document.createElement("td")
        let celdaIdentificacion = document.createElement("td")
        let celdaNombre = document.createElement("td")
        let celdaApellido = document.createElement("td")
        let celdaTelefono = document.createElement("td")
        let celdaDireccion = document.createElement("td")
        let celdaCiudad = document.createElement("td")
        let celdaCorreo_Electronico = document.createElement("td")
        let celdaEstado = document.createElement("td")
        let celdaAcciones = document.createElement("td")
        celdaAcciones.style.textAlign = "center";

        var headerAcciones = document.getElementById("headerAcciones"); // Suponiendo que tengas un ID para el encabezado de la columna "Acciones"
        headerAcciones.style.textAlign = "center";

        let botonEditarCliente = document.createElement("button");
        botonEditarCliente.value = result[i]["id_cliente"];
        botonEditarCliente.innerHTML = "Editar";
        botonEditarCliente.onclick = function (e) {
          $('#exampleModal').modal('show');
          consultarClienteID(this.value);
        }
        botonEditarCliente.className = "btn btn-warning editar_cliente";

        let botonEliminar = document.createElement("button");
        botonEliminar.value = result[i]["id_cliente"];
        botonEliminar.innerHTML = "Eliminar";
        botonEliminar.onclick = function (e) {
          $('#exampleModal').modal('show');
          consultarClienteID(this.value);
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

        celdaID_Cliente.innerText = result[i]["id_cliente"];
        celdaTipo_Identificacion.innerText = result[i]["tipo_identificacion"];
        celdaIdentificacion.innerText = result[i]["identificacion"];
        celdaNombre.innerText = result[i]["nombre_cliente"];
        celdaApellido.innerText = result[i]["apellido_cliente"];
        celdaTelefono.innerText = result[i]["telefono"];
        celdaDireccion.innerText = result[i]["direccion"];
        celdaCiudad.innerText = result[i]["ciudad"];
        celdaCorreo_Electronico.innerText = result[i]["correo_electronico"];
        celdaEstado.innerText = result[i]["estado"];

        celdaAcciones.appendChild(botonEditarCliente);
        celdaAcciones.appendChild(botonEliminar);
        celdaAcciones.appendChild(botonCambiar_estado);

        trResgistro.appendChild(celdaID_Cliente);
        trResgistro.appendChild(celdaTipo_Identificacion);
        trResgistro.appendChild(celdaIdentificacion);
        trResgistro.appendChild(celdaNombre);
        trResgistro.appendChild(celdaApellido);
        trResgistro.appendChild(celdaTelefono);
        trResgistro.appendChild(celdaDireccion);
        trResgistro.appendChild(celdaCiudad);
        trResgistro.appendChild(celdaCorreo_Electronico);
        trResgistro.appendChild(celdaEstado);
        trResgistro.appendChild(celdaAcciones); // Agregar la celda de "Acciones" a la fila

        cuerpoTabla.appendChild(trResgistro);
      }
    },
    error: function (error) {
      alert("Error en la petición " + error);
    }
  });

  function consultarClienteID(id) {
    $.ajax({
      url: url + id,
      type: "GET",
      success: function (result) {
        document.getElementById("id_cliente").value = result["id_cliente"];
        document.getElementById("tipo_identificacion").value = result["tipo_identificacion"];
        document.getElementById("identificacion").value = result["identificacion"];
        document.getElementById("nombre").value = result["nombre"];
        document.getElementById("apellido").value = result["apellido"];
        document.getElementById("telefono").value = result["telefono"];
        document.getElementById("direccion").value = result["direccion"];
        document.getElementById("cuidad").value = result["cuidad"];
        document.getElementById("correo_electronico").value = result["correo_electronico"];
        document.getElementById("estado").value = result["estado"];
        document.getElementById("acciones").value = result["acciones"];
      }
    });
  }
}

function validarCampos() {
  var identificacion = document.getElementById("identificacion").value;
  var nombre_cliente = document.getElementById("nombre_cliente").value;
  var apellido_cliente = document.getElementById("apellido_cliente").value;
  var telefono = document.getElementById("telefono").value;
  var direccion = document.getElementById("direccion").value;
  var ciudad = document.getElementById("ciudad").value;
  var correo_electronico = document.getElementById("correo_electronico").value;
  var estado = document.getElementById("estado").value;

  var camposValidos = true;

  if (!validarIdentificacion(identificacion)) {
    camposValidos = false;
  }
  if (!validarNombre(nombre_cliente)) {
    camposValidos = false;
  }
  if (!validarApellido(apellido_cliente)) {
    camposValidos = false;
  }
  if (!validarTelefono(telefono)) {
    camposValidos = false;
  }
  if (!validarDireccion(direccion)) {
    camposValidos = false;
  }
  if (!validarCiudad(ciudad)) {
    camposValidos = false;
  }
  if (!validarCorreo(correo_electronico)) {
    camposValidos = false;
  }
  if (!validarEstado(estado)) {
    camposValidos = false;
  }

  return camposValidos;
}

function registrarClientes() {

  let formData = {
    "tipo_identificacion": document.getElementById("tipo_identificacion").value,
    "identificacion": document.getElementById("identificacion").value,
    "nombre_cliente": document.getElementById("nombre_cliente").value,
    "apellido_cliente": document.getElementById("apellido_cliente").value,
    "telefono": document.getElementById("telefono").value,
    "direccion": document.getElementById("direccion").value,
    "ciudad": document.getElementById("ciudad").value,
    "correo_electronico": document.getElementById("correo_electronico").value,
    "estado": document.getElementById("estado").value

  };

  let camposValidos = true;
  let camposRequeridos = [
    "identificacion",
    "nombre_cliente",
    "apellido_cliente",
    "telefono",
    "direccion",
    "ciudad",
    "correo_electronico",
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

//validar direccion
function validarCampos() {
  var direccion = document.getElementById("direccion");
  return validarDireccion(direccion);
}
function validarDireccion(cuadroNumero) {

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

//validarDireccion
function validarCampos() {
  var ciudad = document.getElementById("ciudad");
  return validarCiudad(ciudad);
}
function validarCiudad(cuadroNumero) {

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
  if (valor.length < 1  || valor.length > 11) {
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