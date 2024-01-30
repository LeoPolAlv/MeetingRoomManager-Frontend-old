import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionRolComponent } from './gestion-rol/gestion-rol.component';
import { AdminComponent } from './admin.component';
import { GestionEquipamientoComponent } from './gestion-equipamiento/gestion-equipamiento.component';
import { NuevoUsuarioComponent } from './gestion-usuario/nuevo-usuario/nuevo-usuario.component';
import { DatosUserComponent } from './gestion-usuario/datos-user/datos-user.component';
import { ModifUserComponent } from './gestion-usuario/modif-user/modif-user.component';

const routes: Routes = [
  { path: '', component: AdminComponent},
  { path: 'altarol', component: GestionRolComponent, data: { accion: "new",name:"Crear",titulo:"Nuevo Alta Rol" } },
  { path: 'updaterol', component: GestionRolComponent, data: { accion: "upd",name:"Actualizar",titulo:"Actualizar Datos Rol" } },
  { path: 'deleterol', component: GestionRolComponent, data: { accion: "del",name:"Borrar",titulo:"Borrar Rol" } },
  { path: 'altaeqp', component: GestionEquipamientoComponent, data: { accion: "new",name:"Crear",titulo:"Alta Equipamiento" } },
  { path: 'updteqp', component: GestionEquipamientoComponent, data: { accion: "upd",name:"Actualizar",titulo:"Actualizar Equipamiento" } },
  { path: 'deleqp', component: GestionEquipamientoComponent, data: { accion: "del",name:"Borrar",titulo:"Borrar Equipamiento" } },
  //{ path: 'altauser', component: NuevoUsuarioComponent, data: { accion: "new",name:"Crear",titulo:"Alta Usuario" } },
  { path: 'consultauser', component: DatosUserComponent, data: { accion: "consusr",name:"",titulo:"Datos Usuarios" } },
  { path: 'updateuser/:iduser', component: ModifUserComponent },
 /* { path: 'new', component: NewReservaComponent, data: { usuario: new UsuarioService().getusuario() } },
  { path: '**', redirectTo: "reservas"},*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
