import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionRolComponent } from './gestion-rol/gestion-rol.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path: '', component: AdminComponent}
 /* { path: 'newreserva', component: HomeComponent, data: { usuario: new UsuarioService().getusuario() } },
  { path: 'new', component: NewReservaComponent, data: { usuario: new UsuarioService().getusuario() } },
  { path: '**', redirectTo: "reservas"},*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
