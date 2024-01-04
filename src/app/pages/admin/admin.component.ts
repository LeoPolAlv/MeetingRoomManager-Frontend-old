import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  constructor(
    private router: Router
  ){}

  gestRol(accion:string){
    console.log("Accion: ", accion);

    switch(accion){
      case 'new':{
        //console.log("estamos en un caso de alta de rol");
        this.router.navigateByUrl("admin/altarol");
        break;
      }
      case 'update':{
        //console.log("estamos en un caso de update rol desde admin page");
        this.router.navigateByUrl("admin/updaterol");
        break;
      }
      case 'delete':{
        //console.log("estamos en un caso de delete de rol desde admin page");
        this.router.navigateByUrl("admin/deleterol");
        break;
      }
      default:{

      } 
    }
  }
}
