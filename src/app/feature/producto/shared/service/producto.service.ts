import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { Producto } from '../model/producto';


@Injectable()
export class ProductoService {

  constructor(protected http: HttpService) {}

  public consultar() {
    return this.http.doGet<Producto[]>(`${environment.endpoint}/productos`, this.http.optsName('consultar productos'));
  }

  public guardar(producto: Producto) {
    return this.http.doPost<Producto, boolean>(`${environment.endpoint}/productos`, producto,
                                                this.http.optsName('crear/actualizar productos'));
  }

  public eliminar(idProducto: number) {
    return this.http.doDelete<boolean>(`${environment.endpoint}/productos/${idProducto}`,
                                                 this.http.optsName('eliminar productos'));
  }

  public eliminarTodo(idProducto: number) {
    return this.http.doDelete<boolean>(`${environment.endpoint}/productos/eliminarTodo/${idProducto}`,
                                                 this.http.optsName('eliminar productos'));
  }

  public actualizar(producto: Producto, idProducto: number) {
    return this.http.doPut<Producto, boolean>(`${environment.endpoint}/productos/${idProducto}`, producto,
                                                this.http.optsName('crear/actualizar productos'));
  }
}
