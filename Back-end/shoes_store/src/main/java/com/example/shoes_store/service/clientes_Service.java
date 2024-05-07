package com.example.shoes_store.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.shoes_store.interfaceService.I_ClientesService;
import com.example.shoes_store.interfaces.I_Clientes;
import com.example.shoes_store.models.clientes;

@Service
public class clientes_Service implements I_ClientesService {
    

    @Autowired
	private I_Clientes data;
	
	@Override
	public String save(clientes clientes) {
		data.save(clientes);
		return clientes.getId_cliente();
	}

	@Override
	public List<clientes> findAll() {
		List<clientes> listaClientes=(List<clientes>) data.findAll();
		
		return listaClientes;
	}
	
	@Override
	public List<clientes> filtroClientes(String filtro) {
		List <clientes> listaClientes=data.filtroClientes(filtro);
		return listaClientes;
	}


	@Override
	public Optional<clientes> findOne(String id) {
		Optional<clientes> clientes=data.findById(id);
		
		return clientes;
	}

	@Override
	public int delete(String id) {
		data.deleteById(id);
		return 1;
	}
}
