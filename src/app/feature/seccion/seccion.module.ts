import { NgModule } from '@angular/core';
import { SeccionComponent } from '../seccion/components/seccion.component';
import { SeccionRoutingModule } from './seccion-routing.module';

@NgModule({
  declarations: [
    SeccionComponent
  ],
  imports: [
    SeccionRoutingModule
  ],
  providers: []
})
export class SeccionModule { }
