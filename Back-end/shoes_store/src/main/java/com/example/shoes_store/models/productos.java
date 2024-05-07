package com.example.shoes_store.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class productos {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_producto", nullable = false, length = 36, columnDefinition = "char(36)")
    private String id_producto;


    @Column(name = "nombre_producto", nullable = false, length = 45)
    private String nombre_producto;

    @Column(name = "descripcion", nullable = false, length = 45)
    private String descripcion;

    @Column(name = "cantidad", nullable = false, length = 13)
    private int cantidad;

    @Column(name = "precio", nullable = false, length = 45)
    private double precio ;

    @Column(name = "porcentaje_iva", nullable = false, length = 45)
    private double porcentaje_iva;

    @Column(name = "porcentaje_descuento", nullable = false, length = 45)
    private double porcentaje_descuento = 0.0;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado", nullable = false, length = 10)
    private estado estado;
    

    public enum estado {
        ACTIVO,
        INACTIVO,

    }


    public productos() {
    }


    public productos(String id_producto, String nombre_producto, String descripcion, int cantidad, double precio,
            double porcentaje_iva, double porcentaje_descuento,
            com.example.shoes_store.models.productos.estado estado) {
        this.id_producto = id_producto;
        this.nombre_producto = nombre_producto;
        this.descripcion = descripcion;
        this.cantidad = cantidad;
        this.precio = precio;
        this.porcentaje_iva = porcentaje_iva;
        this.porcentaje_descuento = porcentaje_descuento;
        this.estado = estado;
    }


    public String getId_producto() {
        return id_producto;
    }


    public void setId_producto(String id_producto) {
        this.id_producto = id_producto;
    }


    public String getNombre_producto() {
        return nombre_producto;
    }


    public void setNombre_producto(String nombre_producto) {
        this.nombre_producto = nombre_producto;
    }


    public String getDescripcion() {
        return descripcion;
    }


    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }


    public int getCantidad() {
        return cantidad;
    }


    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }


    public double getPrecio() {
        return precio;
    }


    public void setPrecio(double precio) {
        this.precio = precio;
    }


    public double getPorcentaje_iva() {
        return porcentaje_iva;
    }


    public void setPorcentaje_iva(double porcentaje_iva) {
        this.porcentaje_iva = porcentaje_iva;
    }


    public double getPorcentaje_descuento() {
        return porcentaje_descuento;
    }


    public void setPorcentaje_descuento(double porcentaje_descuento) {
        this.porcentaje_descuento = porcentaje_descuento;
    }


    public estado getEstado() {
        return estado;
    }


    public void setEstado(estado estado) {
        this.estado = estado;
    }

    
    
}


