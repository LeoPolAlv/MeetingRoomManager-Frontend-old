import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HeadFootModule } from '../head-foot/head-foot.module';
import { AdminModule } from './admin/admin.module';


@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    AdminModule,
    HeadFootModule
  ],
  exports: [
    PagesComponent
  ]
})
export class PagesModule { }
