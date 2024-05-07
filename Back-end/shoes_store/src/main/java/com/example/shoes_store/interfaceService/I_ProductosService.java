package com.example.shoes_store.interfaceService;

import java.util.List;
import java.util.Optional;


import com.example.shoes_store.models.productos;


public interface I_ProductosService {
    
     public String save(productos productos);
	public List<productos> findAll();
	public List<productos> filtroProducto(String filtro);
	public Optional<productos> findOne(String id);
	public int delete(String id);
}
