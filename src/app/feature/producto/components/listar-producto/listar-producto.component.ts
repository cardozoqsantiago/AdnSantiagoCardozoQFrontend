import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ProductoService } from '@producto/shared/service/producto.service';
import { Producto } from '@producto/shared/model/producto';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReservaService } from 'src/app/feature/reserva/shared/service/reserva.service';
import { TipoProducto } from '@core/modelo/tipo-producto';

@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.component.html',
  styles: [`.abrir-modal{
    /* rgb para transparencia */
    background-color: rgba(0, 0, 0, 0.7);
    /* posicion de forma fija */
    position: fixed;
    top:0px;
    left: 0px;
    width: 100%;
    height: 100%;
    /* posicion frente a los demas elementos, solo se puede aplicar a estilos que tengan atributos position */
    z-index: 1000;
}

.animacion{
    /* para que funcione en firefox */
    animation-duration: 2s;
    animation-fill-mode: both;
    /* webkit es para la compatibilidad con chrome y con safari */
    -webkit-animation-duration: 2s;
    -webkit-animation-fill-mode: both;
}

.fadeIn{
    animation-name: fadeIn;
    -webkit-animation-name: fadeIn;
}
@keyframes fadeIn{
    0%{
        opacity: 0;
    }to{
        opacity: 1;
    }
}

@-webkit-keyframes fadeIn{
    0%{
        opacity: 0;
    }to{
        opacity: 1;
    }
}`],
})
export class ListarProductoComponent implements OnInit {
  public modalActualizar: boolean;
  public modalReserva: boolean;
  public productos: Producto[] = []
  public tipos: TipoProducto[]
  public listaProductos: Observable<Producto[]>;
  public productoSeleccionado: Producto;
  productoForm: FormGroup;
  reservaForm: FormGroup;
  constructor(protected productoService: ProductoService, protected reservaService: ReservaService) { }

  ngOnInit() {
    this.tipos = [
      { nombre: 'BLUSA' },
      { nombre: 'FALDA' },
      { nombre: 'VESTIDO' } 
    ];
    this.modalActualizar = false;
    this.listarProductos()
  }

  cerrarModalReserva() {
    this.modalReserva = false;
  }

  cerrarModalActualizar() {
    this.modalActualizar = false;
  }

  abrirModalReserva(producto: Producto) {
    this.productoSeleccionado = producto;
    this.modalReserva = true;
    this.construirFormularioReserva();
  }

  abrirModalActualizar(producto: Producto) {
    this.productoSeleccionado = producto;
    this.modalActualizar = true;
    this.construirFormularioProducto();
  }

  listarProductos() {
    this.productoService.consultar().subscribe(p => {
      this.productos = p
    })
  }

  actualizarProducto() {
    this.productoService.actualizar(this.productoForm.value, this.productoSeleccionado.id).subscribe(res => {
      console.log(res)
      Swal.fire(
        'Actualizado!',
        'El producto fue actualizado exitosamente.',
        'success'
      )
      this.listarProductos()
      this.cerrarModalActualizar();
    }, error => {
      console.log(error)
      Swal.fire(
        'Error!',
        error.error.mensaje,
        'error'
      )
    })

  }

  reservarProducto() {
    this.reservaService.guardar(this.reservaForm.value).subscribe(res => {
      console.log(res)
      Swal.fire(
        'Reservado!',
        'El producto fue reservado exitosamente.',
        'success'
      )
      this.listarProductos()
      this.cerrarModalReserva();
    }, error => {
      console.log(error)
      Swal.fire(
        'Error!',
        error.error.mensaje,
        'error'
      )
    })

  }

  deleteProduct(idProducto: number) {
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
        this.productoService.eliminar(idProducto).subscribe(res => {
          console.log(res)
          Swal.fire(
            'Eliminado!',
            'El producto fue eliminado exitosamente.',
            'success'
          )
          this.listarProductos()
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

  private construirFormularioProducto() {
    this.productoForm = new FormGroup({
      nombre: new FormControl(this.productoSeleccionado.nombre, [Validators.required]),
      tipoProducto: new FormControl(this.productoSeleccionado.tipoProducto, [Validators.required]),
      cantidad: new FormControl(this.productoSeleccionado.cantidad, [Validators.required]),
      precio: new FormControl(this.productoSeleccionado.precio, [Validators.required])
    });
  }

  private construirFormularioReserva() {
    this.reservaForm = new FormGroup({
      fechaReserva: new FormControl('', [Validators.required]),
      idProducto: new FormControl(this.productoSeleccionado.id, [Validators.required])
    });
  }

}
