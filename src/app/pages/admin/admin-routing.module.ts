import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionRolComponent } from './gestion-rol/gestion-rol.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path: '', component: AdminComponent},
  { path: 'altarol', component: GestionRolComponent, data: { accion: "new",name:"Crear",titulo:"Nuevo Alta Rol" } },
  { path: 'updaterol', component: GestionRolComponent, data: { accion: "upd",name:"Actualizar",titulo:"Actualizar Datos Rol" } },
  { path: 'deleterol', component: GestionRolComponent, data: { accion: "del",name:"Borrar",titulo:"Borrar Rol" } },
 /* { path: 'new', component: NewReservaComponent, data: { usuario: new UsuarioService().getusuario() } },
  { path: '**', redirectTo: "reservas"},*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
