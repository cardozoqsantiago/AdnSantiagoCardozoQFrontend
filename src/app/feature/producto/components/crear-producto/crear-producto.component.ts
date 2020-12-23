import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../shared/service/producto.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { TipoProducto } from '@core/modelo/tipo-producto';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html'
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;
  public tipos: TipoProducto[]
  constructor(protected productoService: ProductoService) { }

  ngOnInit() {
    this.tipos = [
      { nombre: 'BLUSA' },
      { nombre: 'FALDA' },
      { nombre: 'VESTIDO' } 
    ];
    this.construirFormularioProducto();
  }

  crear() {
    console.log(this.productoForm.value)
    this.productoService.guardar(this.productoForm.value).subscribe(res => {
      console.log(res)
      Swal.fire(
        'Creado',
        'El producto fue creado exitosamente.',
        'success'
      )
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
