import { NgModule } from '@angular/core';
import { NavbarComponent } from '../navbar/components/navbar.component';
import { NavbarRoutingModule } from './navbar-routing.module';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    NavbarRoutingModule
  ],
  providers: []
})
export class NavbarModule { }
