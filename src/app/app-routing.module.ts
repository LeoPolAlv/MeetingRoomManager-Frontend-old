import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesModule } from './pages/pages.module';
import { PagesRoutingModule } from './pages/pages-routing.module';

const routes: Routes = [
{path: '', pathMatch:'full', redirectTo:'/pages'}
/*
 { path: '', pathMatch: 'full', redirectTo: '/login' },
  //{ path: 'admin', pathMatch: 'full', redirectTo: '/admin' },
  { path: 'noauth', component: NoAutorizadoComponent },
  { path: '**', component: NoFoundPageComponent },
*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
