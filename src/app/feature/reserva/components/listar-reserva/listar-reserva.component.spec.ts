import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ListarReservaComponent } from './listar-reserva.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ReservaService } from '../../shared/service/reserva.service';
import { Reserva } from '../../shared/model/reserva';
import { HttpService } from 'src/app/core/services/http.service';

describe('ListarProductoComponent', () => {
  let component: ListarReservaComponent;
  let fixture: ComponentFixture<ListarReservaComponent>;
  let productoService: ReservaService;
  const listaProductos: Reserva[] = [new Reserva('1', 'Producto 1'), new Reserva('2', 'Producto 2')];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListarReservaComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [ReservaService, HttpService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarReservaComponent);
    component = fixture.componentInstance;
    productoService = TestBed.inject(ReservaService);
    spyOn(productoService, 'consultar').and.returnValue(
      of(listaProductos)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.listaReservas.subscribe(resultado => {
      expect(2).toBe(resultado.length);
  });
});

});
