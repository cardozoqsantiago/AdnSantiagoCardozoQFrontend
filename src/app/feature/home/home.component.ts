import { Component, OnInit } from '@angular/core';
import { Producto } from '@producto/shared/model/producto';
import { ProductoService } from '@producto/shared/service/producto.service';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public productos: Producto[] = []
  constructor(protected productoService: ProductoService) { }

  ngOnInit() {
    this.listarProductos()
    this.construirFormularioProducto();
  }

  listarProductos() {
    this.productoService.consultar().subscribe(p => {
      this.productos = p
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

  productoForm: FormGroup;

  crear() {
    console.log(this.productoForm.value)
    this.productoService.guardar(this.productoForm.value).subscribe(res => {
      console.log(res)
      Swal.fire(
        'Creado',
        'El producto fue creado exitosamente.',
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

  private construirFormularioProducto() {
    this.productoForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      tipoProducto: new FormControl('', [Validators.required]),
      cantidad: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required])
    });
  }

}
