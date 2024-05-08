var url = "http://localhost:8080/api/v1/Clientes/";

function listarClientes() {
  //METODO PARA LISTAR LOS CLIENTES
  //SE CREA LA PETICION AJAX
  var capturarFiltro = document.getElementById("inputSearch").value;
  var urlLocal=url;
  if (capturarFiltro!=""){
    urlLocal+="busquedafiltro/"+capturarFiltro;
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
        let celdaAcciones = document.createElement("td")
        let celdaEstado = document.createElement("td")

        let celdaOpcion = document.createElement("td");
        let botonEditarCliente = document.createElement("button");
        botonEditarCliente.value=result[i]["id_cliente"];
        botonEditarCliente.innerHTML = "Editar";

        
        botonEditarCliente.onclick=function(e){
          $('#exampleModal').modal('show');
          consultarClienteID(this.value);
        }
        botonEditarCliente.className = "btn btn-warning editar-cliente";


        

        celdaID_Cliente.innerText = result[i]["id_cliente"];
        celdaTipo_Identificacion.innerText = result[i]["tipo_identificacion"];
        celdaIdentificacion.innerText = result[i]["identificacion"];
        celdaNombre.innerText = result[i]["nombre"];
        celdaApellido.innerText = result[i]["apellido"];
        celdaTelefono.innerText = result[i]["telefono"];
        celdaDireccion.innerText = result[i]["direccion"];
        celdaCiudad.innerText = result[i][ciudad];
        celdaCorreo_Electronico.innerText = result[i]["correo"];
        celdaAcciones.innerText = result[i][acciones];
        celdaEstado.innerText = result[i]["estado"];


        trResgistro.appendChild(celdaID_Cliente);
        trResgistro.appendChild(celdaTipo_Identificacion);
        trResgistro.appendChild(celdaIdentificacion);
        trResgistro.appendChild(celdaNombre);
        trResgistro.appendChild(celdaApellido);
        trResgistro.appendChild(celdaTelefono);
        trResgistro.appendChild(celdaDireccion);
        trResgistro.appendChild(celdaCiudad);
        trResgistro.appendChild(celdaCorreo_Electronico);
        trResgistro.appendChild(celdaAcciones);
        trResgistro.appendChild(celdaEstado);


        celdaOpcion.appendChild(botonEditarCliente);
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

  function consultarClienteID(id){
    //alert(id);
    $.ajax({
        url:url+id,
        type:"GET",
        success: function(result){
            document.getElementById("id_cliente").value=result["id_cliente"];
            document.getElementById("tipo_identificacion").value=result["tipo_identificacion"];
            document.getElementById("identificacion").value=result["identificacion"];
            document.getElementById("nombre").value=result["nombre"];
            document.getElementById("apellido").value=result["apellido"];
            document.getElementById("telefono").value=result["telefono"];
            document.getElementById("direccion").value=result["direccion"];
            document.getElementById("cuidad").value=result["cuidad"];
            document.getElementById("correo_electronico").value=result["correo_electronico"];
            document.getElementById("acciones").value=result["acciones"];
            document.getElementById("estado").value=result["estado"];
        }
    });
  }
}