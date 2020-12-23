import { NgModule } from '@angular/core';

import { ReservaRoutingModule } from './reserva-routing.module';
import { ListarReservaComponent } from './components/listar-reserva/listar-reserva.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { SharedModule } from '@shared/shared.module';
import { ReservaService } from './shared/service/reserva.service';


@NgModule({
  declarations: [
    ListarReservaComponent,
    ReservaComponent
  ],
  imports: [
    ReservaRoutingModule,
    SharedModule
  ],
  providers: [ReservaService]
})
export class ReservaModule { }
