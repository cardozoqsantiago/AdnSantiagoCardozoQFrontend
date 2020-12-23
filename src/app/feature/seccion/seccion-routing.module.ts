import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeccionComponent } from './components/seccion.component';

const routes: Routes = [
  {
    path: '',
    component: SeccionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeccionRoutingModule { }
