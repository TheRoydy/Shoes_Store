package com.example.shoes_store.interfaces;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.example.shoes_store.models.clientes;

public interface I_Clientes extends CrudRepository<clientes, String> {
    
    @Query("SELECT c FROM clientes c WHERE "
			+ "c.tipo_identificacion LIKE %?1% OR "
			+ "c.identificacion LIKE %?1% OR "
			+ "c.nombre_cliente LIKE %?1% OR "
			+ "c.apellido_cliente LIKE %?1% OR "
			+ "c.telefono LIKE %?1% OR "
			+ "c.estado LIKE %?1%")
	List<clientes>filtroClientes(String filtro);
}
