package com.example.shoes_store.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.shoes_store.interfaceService.I_ProductosService;
import com.example.shoes_store.interfaces.I_Productos;
import com.example.shoes_store.models.productos;

@Service
public class productos_Service implements I_ProductosService {
    
    @Autowired
	private I_Productos data;
	
	@Override
	public String save(productos producto) {
		data.save(producto);
		return producto.getId_producto();
	}

	@Override
	public List<productos> findAll() {
		List<productos> listaProducto=(List<productos>) data.findAll();
		
		return listaProducto;
	}
	
	@Override
	public List<productos> filtroProducto(String filtro) {
		List <productos> listaProducto=data.filtroProducto(filtro);
		return listaProducto;
	}


	@Override
	public Optional<productos> findOne(String id) {
		Optional<productos> producto=data.findById(id);
		
		return producto;
	}

	@Override
	public int delete(String id) {
		data.deleteById(id);
		return 1;
	}
}
