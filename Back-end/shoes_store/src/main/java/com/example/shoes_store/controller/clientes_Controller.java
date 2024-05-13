package com.example.shoes_store.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.shoes_store.interfaceService.I_ClientesService;
import com.example.shoes_store.models.clientes;

@RequestMapping("/api/v1/clientes/")
@RestController
@CrossOrigin
public class clientes_Controller {

    @Autowired
	private I_ClientesService clientes_Service;
	
	@PostMapping("/")

	public ResponseEntity<Object> save(@ModelAttribute("clientes") clientes clientes) {
	    
	    List<clientes> clientes2 = clientes_Service.filtroClientes(clientes.getIdentificacion());
	    if (!clientes2.isEmpty()) {
	        return new ResponseEntity<>("El paciente ya tiene un ingreso activo", HttpStatus.BAD_REQUEST);
	    }
	    
	    if (clientes.getIdentificacion().equals("")) {

            return new ResponseEntity<>("El documento de identidad es obligatorio", HttpStatus.BAD_REQUEST);
        }

        if (clientes.getNombre_cliente().equals("")) {

            return new ResponseEntity<>("El primer nombre es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }
        if (clientes.getApellido_cliente().equals("")) {

            return new ResponseEntity<>("El primer apellido es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }

        if (clientes.getTelefono().equals("")) {

            return new ResponseEntity<>("El numero de telefono es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }

		if (clientes.getDireccion().equals("")) {

            return new ResponseEntity<>("El numero de telefono es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }

		if (clientes.getCiudad().equals("")) {

            return new ResponseEntity<>("El numero de telefono es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }

        if (clientes.getCorreo_electronico().equals("")) {

            return new ResponseEntity<>("El correo es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }
		if (clientes.getEstado().equals("")) {

            return new ResponseEntity<>("El estado es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }

		clientes_Service.save(clientes);
		return new ResponseEntity<>(clientes,HttpStatus.OK);
	}
	
	@GetMapping("/")
	public ResponseEntity<Object> findAll(){
		var ListaClientes=clientes_Service.findAll();
		return new ResponseEntity<>(ListaClientes,HttpStatus.OK);
	}
	
	@GetMapping("/busquedafiltro/{filtro}")
	public ResponseEntity<Object>findFiltro(@PathVariable String filtro){
		var ListaClientes = clientes_Service.filtroClientes(filtro);
		return new ResponseEntity<>(ListaClientes, HttpStatus.OK);
	}
	
	
	@GetMapping("/{id_cliente}")
	public ResponseEntity<Object> findOne(@PathVariable("id") String id){
		var clientes=clientes_Service.findOne(id);
		return new ResponseEntity<>(clientes,HttpStatus.OK);
	}
	
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> delete(@PathVariable("id") String id){
		clientes_Service.delete(id);
		return new ResponseEntity<>("Registro Eliminado",HttpStatus.OK);
	}
	
	@PutMapping("/{id_cliente}")
	public ResponseEntity<Object> update(@PathVariable("id") String id, @ModelAttribute("clientes") clientes clientesUpdate){
		var clientes= clientes_Service.findOne(id).get();
		if (clientes != null) {
			clientes.setTipo_identificacion(clientesUpdate.getTipo_identificacion());
			clientes.setIdentificacion(clientesUpdate.getIdentificacion());
            clientes.setNombre_cliente(clientesUpdate.getNombre_cliente());
            clientes.setApellido_cliente(clientesUpdate.getApellido_cliente());
            clientes.setTelefono(clientesUpdate.getTelefono());
            clientes.setDireccion(clientesUpdate.getDireccion());
            clientes.setCiudad(clientesUpdate.getCiudad());
			clientes.setCorreo_electronico(clientesUpdate.getCorreo_electronico());
            clientes.setEstado(clientesUpdate.getEstado());
			
			clientes_Service.save(clientes);
			return new ResponseEntity<>("Guardado",HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>("Error clientes no encontrado",HttpStatus.BAD_REQUEST);
		}
		
	}
	
	

}
    

