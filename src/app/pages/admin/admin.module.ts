import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListboxModule } from 'primeng/listbox';
import { FieldsetModule } from 'primeng/fieldset';

import { AdminRoutingModule } from './admin-routing.module';
import { GestionRolComponent } from './gestion-rol/gestion-rol.component';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GestionRolComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    MessagesModule,
    BrowserAnimationsModule,
    ListboxModule,
    FieldsetModule
  ]
})
export class AdminModule { }
