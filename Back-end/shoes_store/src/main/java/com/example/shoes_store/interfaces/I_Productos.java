package com.example.shoes_store.interfaces;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.shoes_store.models.productos;

@Repository
public interface I_Productos extends CrudRepository<productos, String> {
    

     @Query("SELECT p FROM productos p WHERE "
			+ "p.nombre_producto LIKE %?1% OR "
			+ "p.estado LIKE %?1%")
	List<productos>filtroProducto(String filtro);
}
