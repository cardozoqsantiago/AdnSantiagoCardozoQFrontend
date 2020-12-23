export class Producto {
    id: number;
    nombre : string;
    tipoProducto : string;
    cantidad : number;
    precio : number;

    constructor(id: number, nombre: string, tipoProducto: string, cantidad: number,
        precio : number) {
        this.id = id;
        this.nombre = nombre;
        this.tipoProducto = tipoProducto;
        this.cantidad = cantidad;
        this.precio = precio;
    }
}
