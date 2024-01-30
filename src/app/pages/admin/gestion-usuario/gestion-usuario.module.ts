import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevoUsuarioComponent } from './nuevo-usuario/nuevo-usuario.component';

import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { ListboxModule } from 'primeng/listbox';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DragDropModule } from 'primeng/dragdrop';
import { PickListModule } from 'primeng/picklist';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';



import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DatosUserComponent } from './datos-user/datos-user.component';
import { ModifUserComponent } from './modif-user/modif-user.component';


@NgModule({
  declarations: [
    NuevoUsuarioComponent,
    DatosUserComponent,
    ModifUserComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FieldsetModule,
    ListboxModule,
    ButtonModule,
    MessagesModule,
    PasswordModule,
    DividerModule,
    InputTextModule,
    TableModule,
    TagModule,
    RouterModule,
    DragDropModule,
    PickListModule,
    SelectButtonModule,
    ConfirmDialogModule,
    ToastModule
  ],providers: []
})
export class GestionUsuarioModule { }
