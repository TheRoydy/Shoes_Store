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

import com.example.shoes_store.interfaceService.I_ProductosService;
import com.example.shoes_store.models.productos;

@RequestMapping("/api/v1/productos/")
@RestController
@CrossOrigin
public class productos_Controller {
    
     @Autowired
	private I_ProductosService productos_Service;
	
	@PostMapping("/")
	public ResponseEntity<Object> save(
			@ModelAttribute("productos")productos productos
			){
		productos_Service.save(productos);
		return new ResponseEntity<>(productos,HttpStatus.OK);
		
	}
	
	@GetMapping("/")
	public ResponseEntity<Object> findAll(){
		var listaProducto=productos_Service.findAll();
		return new ResponseEntity<>(listaProducto,HttpStatus.OK);
	}
	
	@GetMapping("/busquedafiltro/{filtro}")
	public ResponseEntity<Object>findFiltro(@PathVariable String filtro){
		var listaProducto = productos_Service.filtroProducto(filtro);
		return new ResponseEntity<>(listaProducto, HttpStatus.OK);
	}
	
	
	@GetMapping("/{id}")
	public ResponseEntity<Object> findOne(@PathVariable("id") String id){
		var productos=productos_Service.findOne(id);
		return new ResponseEntity<>(productos,HttpStatus.OK);
	}
	
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> delete(@PathVariable("id") String id){
		productos_Service.delete(id);
		return new ResponseEntity<>("Registro Eliminado",HttpStatus.OK);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Object> update(@PathVariable("id") String id, @ModelAttribute("productos") productos productosUpdate){
		var productos= productos_Service.findOne(id).get();
		if (productos != null) {
			productos.setNombre_producto(productosUpdate.getNombre_producto());
            productos.setDescripcion(productosUpdate.getDescripcion());
            productos.setCantidad(productosUpdate.getCantidad());
            productos.setPrecio(productosUpdate.getPrecio());
            productos.setPorcentaje_iva(productosUpdate.getPorcentaje_iva());
			productos.setPorcentaje_descuento(productosUpdate.getPorcentaje_descuento());
            productos.setEstado(productosUpdate.getEstado());
			productos_Service.save(productos);
			return new ResponseEntity<>("Guardado",HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>("Error productos no encontrado",HttpStatus.BAD_REQUEST);
		}
		
	}
}
