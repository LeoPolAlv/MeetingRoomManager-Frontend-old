import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRoutingModule } from './user/user-routing.module';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: 'user', 
    //canActivate: [AuthGuard],
    component: PagesComponent,
    loadChildren: () => import('./user/user-routing.module').then(m => m.UserRoutingModule)
  },
  {
    path: 'admin', 
    //canActivate: [AuthGuard, RolesGuard],
    component: PagesComponent,
    loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    UserRoutingModule
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
