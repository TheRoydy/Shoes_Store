package com.example.shoes_store.interfaceService;

import java.util.List;
import java.util.Optional;


import com.example.shoes_store.models.clientes;;

public interface I_ClientesService {

    public String save(clientes clientes);
	public List<clientes> findAll();
	public List<clientes> filtroClientes(String filtro);
	public Optional<clientes> findOne(String id);
	public int delete(String id);
}
