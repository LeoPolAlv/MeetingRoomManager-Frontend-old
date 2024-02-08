import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RolResponce } from 'src/app/interfaces/rol-responce';
import { UserResponce } from 'src/app/interfaces/user-responce';
import { RolService } from 'src/app/core/services/rol.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';

@Component({
  selector: 'app-modif-user',
  templateUrl: './modif-user.component.html',
  styleUrls: ['./modif-user.component.css'] 
})

export class ModifUserComponent implements OnInit{

  idUser: string =  "" ;
  selectedRoles: RolResponce[] = [];
  datosAux: any[] = [];
  rolesDisponibles: RolResponce[] = [];
  rolesAux: RolResponce[] = [];
  rolesAux1: RolResponce[] = [];

  draggerRol: RolResponce |undefined | null;

  constructor(
    private rolService: RolService,
    private activatedRoute: ActivatedRoute,
    private usuarioServicio: UsuarioService,
    private router: Router
  ){
    console.log("Constructor de modif User");
    
    this.idUser = this.activatedRoute.snapshot.paramMap.get('iduser') || "";
    this.usuarioServicio.findUser(this.idUser).subscribe({
      next: (usuario: UserResponce) => {
        usuario.roles.forEach(rol => {
          this.selectedRoles.push(rol);
        })
        //console.log("Datos de usuario a modificar: ", this.selectedRoles);
      },
      error: err => console.log("Error al obtener datos de usuario en Modif-user: ", err),
    });

  }
  ngOnInit(): void {
    console.log("On Init de modif User");
    this.rolService.buscarRoles().subscribe({
      next: (roles) => {
        this.rolesAux = roles;
        //console.log("Buscando todos los roles ");
      },
      error: err => console.log("Error en recuperar Roles: ", err),
      complete: () =>{
        console.log("Completada la busqueda de todos los roles");
        //Seleccionamos los roles que no tiene asignado el usuaio para mostrarlos en la tabla de la izquierda.
        this.rolesAux.forEach(rolA =>{
          let encontrado: boolean = false;
          this.selectedRoles.forEach(rolB =>{
            if(rolA.nombreRol == rolB.nombreRol){
              encontrado = true
            }
          })
          if (!encontrado){
            this.rolesDisponibles.push(rolA);
          }
        })
        console.log("roles disponibles final: ", this.rolesDisponibles);
      }
    });
  }

  findIndex(rol: RolResponce) {
    let index = -1;
    for (let i = 0; i < (this.rolesDisponibles as RolResponce[]).length; i++) {
        if (rol.idRol === (this.rolesDisponibles as RolResponce[])[i].idRol) {
            index = i;
            break;
        }
    }
    return index;
  }

  confirmarCambos(){
    let rolAux: string[] = [];

    this.selectedRoles.forEach((rol: RolResponce) => {
      console.log("Ro, que leo en confirmar datos: ", rol)
      rolAux.push(rol.nombreRol);
    });

    this.usuarioServicio.cambioRoles(this.idUser,rolAux).subscribe({
      next: dato => console.log("Dato que recibo al actualizar roles: ", dato),
      error: err => console.log("Se produjo un error al actualizar los Roles de Usuario: ", err)
    })
  }

  volver(){
    this.router.navigateByUrl("admin/consultauser")
  }
}
