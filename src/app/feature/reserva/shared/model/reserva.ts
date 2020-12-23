export class Reserva {
    id: number;
    fechaReserva : Date;
    idProducto : number;

    constructor(id: number, fechaReserva: Date, idProducto: number ) {
        this.id = id;
        this.fechaReserva = fechaReserva;
        this.idProducto = idProducto;
    }
}
