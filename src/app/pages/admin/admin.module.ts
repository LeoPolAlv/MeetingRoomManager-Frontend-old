import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

import { AdminRoutingModule } from './admin-routing.module';
import { GestionRolComponent } from './gestion-rol/gestion-rol.component';
import { AdminComponent } from './admin.component';


@NgModule({
  declarations: [
    GestionRolComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CardModule,
    ButtonModule
  ]
})
export class AdminModule { }
