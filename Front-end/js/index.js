var URL = "http://localhost:8080/api/v1/clientes/";

function listaClientes() {

    //Se crea el filtro
    var capturarFiltro = document.getElementById("Search").value;
    var urlClientes = url;
    if (capturarFiltro != "") {
        urlClientes += "busquedafiltro/" + capturarFiltro;
    }

    $.ajax({
        url: "http://localhost:8080/api/v1/clientes/",
        type: "GET",
        success: function (result) {
            console.log(result);

            var listaClientes = document.getElementById("listaClientes");

            listaClientes.innerHTML = "";

            for (var i = 0; i < result.length; i++) {
                let trRegistro = document.createElement("tr");
                trRegistro.classList.add(i % 2 === 0 ? "form-fielddd" : "form-fieldd");
                let celdaID_Clientes = document.createElement("td");
                let celdaTipo_Identificacion = document.createElement("td");
                let celdaIdentificacion = document.createElement("td");
                let celdaNombre = document.createElement("td");
                let celdaApellido = document.createElement("td");
                let celdaTelefono = document.createElement("td");
                let celdaDireccion = document.createElement("td");
                let celdaCiudad = document.createElement("td");
                let celdaCorreo_Electronico = document.createElement("td");
                let celdaEstado = document.createElement("td");
                let celdaEditar = document.createElement("td");
                let celdaEliminar = document.createElement("td");

                celdaID_Clientes.innerText = result[i]["id"];
                celdaTipo_Identificacion.innerText = result[i]["tipo_identificacion"];
                celdaIdentificacion.innerText = result[i]["identificacion"];
                celdaNombre.innerText = result[i]["nombre"];
                celdaApellido.innerText = result[i]["apellido"];
                celdaTelefono.innerText = result[i]["telefono"];
                celdaDireccion.innerText = result[i]["direccion"];
                celdaCiudad.innerText = result[i]["ciudad"];
                celdaCorreo_Electronico.innerText = result[i]["correo_electronico"];
                celdaEstado.innerText = result[i]["estado"];

                // Agregar el botón "Editar"
                let botonEditar = document.createElement("a");
                botonEditar.className = "boton-editar";
                botonEditar.textContent = "Editar";
                botonEditar.id = "btnEditar";

                // Agregar el botón "Eliminar"
                let botonEliminar = document.createElement("button");
                botonEliminar.className = "boton-eliminar";
                botonEliminar.textContent = "Eliminar";

                // Agregar evento al botón Eliminar
                botonEliminar.onclick = (function (id) {
                    return function () {
                        eliminarCliente(id);
                    };
                })(result[i]["id"]);

                botonEditar.onclick = (function (index) {
                    return function () {
                        let idCliente = result[index]["id"];
                        let modal = document.getElementById("staticBackdrop");
                        if (!modal) {
                            let modalCode = `
                                <!-- Modal -->
                                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="staticBackdropLabel">Editar Cliente</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <!-- Aquí coloca el formulario de edición de cliente -->
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                                <button type="button" class="btn btn-primary">Guardar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `;

                            let modalContainer = document.createElement("div");
                            modalContainer.innerHTML = modalCode;
                            document.body.appendChild(modalContainer);
                            modal = document.getElementById("staticBackdrop");
                        }

                        let modalInstance = new bootstrap.Modal(modal);
                        modalInstance.show();

                        let botonGuardar = modal.querySelector(".btn-primary");

                        botonGuardar.addEventListener("click", function () {
                            guardarCambiosCliente(idCliente);
                        });

                        cargarDatosClienteEnFormulario(idCliente);
                    };
                })(i);

                celdaEditar.appendChild(botonEditar);
                celdaEliminar.appendChild(botonEliminar);

                trRegistro.appendChild(celdaID_Clientes);
                trRegistro.appendChild(celdaTipo_Identificacion);
                trRegistro.appendChild(celdaIdentificacion);
                trRegistro.appendChild(celdaNombre);
                trRegistro.appendChild(celdaApellido);
                trRegistro.appendChild(celdaTelefono);
                trRegistro.appendChild(celdaDireccion);
                trRegistro.appendChild(celdaCiudad);
                trRegistro.appendChild(celdaCorreo_Electronico);
                trRegistro.appendChild(celdaEstado);
                trRegistro.appendChild(celdaEditar);
                trRegistro.appendChild(celdaEliminar);

                listaClientes.appendChild(trRegistro);
            }
        },
        error: function (error) {
            alert("Error en la petición " + error);
        }
    });

}