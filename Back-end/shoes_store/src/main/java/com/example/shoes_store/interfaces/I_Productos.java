package com.example.shoes_store.interfaces;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import com.example.shoes_store.models.productos;

public interface I_Productos extends CrudRepository<productos, String> {
    

     @Query("SELECT p FROM productos p WHERE "
			+ "p.nombre_producto LIKE %?1% OR "
			+ "p.estado LIKE %?1%")
	List<productos>filtroProducto(String filtro);
}
