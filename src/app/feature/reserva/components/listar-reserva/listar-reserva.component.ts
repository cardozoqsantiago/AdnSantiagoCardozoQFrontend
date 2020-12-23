import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { FormGroup } from '@angular/forms';
import { Reserva } from '../../shared/model/reserva';
import { ReservaService } from '../../shared/service/reserva.service';

@Component({
  selector: 'app-listar-reserva',
  templateUrl: './listar-reserva.component.html'
})
export class ListarReservaComponent implements OnInit {
  public reservas: Reserva[] = []
  public listaReservas: Observable<Reserva[]>;
  productoForm: FormGroup;
  constructor(protected reservaService: ReservaService) { }

  ngOnInit() {
    this.listarReservas()
  }

  listarReservas() {
    this.reservaService.consultar().subscribe(p => {
      this.reservas = p
    })
  }

  deleteReserva(idReserva: number) {
    Swal.fire({
      title: 'Esta Seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservaService.eliminar(idReserva).subscribe(res => {
          console.log(res)
          Swal.fire(
            'Eliminado!',
            'La reserva fue eliminada exitosamente.',
            'success'
          )
          this.listarReservas()
        }, error => {
          console.log(error)
          Swal.fire(
            'Error!',
            error.error.mensaje,
            'error'
          )
        })
      }
    })
  }

}
