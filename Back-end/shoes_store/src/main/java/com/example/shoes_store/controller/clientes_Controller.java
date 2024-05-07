package com.example.shoes_store.controller;

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
	public ResponseEntity<Object> save(
			@ModelAttribute("clientes")clientes clientes
			){
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
	
	
	@GetMapping("/{id}")
	public ResponseEntity<Object> findOne(@PathVariable("id") String id){
		var clientes=clientes_Service.findOne(id);
		return new ResponseEntity<>(clientes,HttpStatus.OK);
	}
	
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> delete(@PathVariable("id") String id){
		clientes_Service.delete(id);
		return new ResponseEntity<>("Registro Eliminado",HttpStatus.OK);
	}
	
	@PutMapping("/{id}")
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
            clientes.setEstado(clientesUpdate.getEstado());
			
			clientes_Service.save(clientes);
			return new ResponseEntity<>("Guardado",HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>("Error clientes no encontrado",HttpStatus.BAD_REQUEST);
		}
		
	}
	
	

}
    

