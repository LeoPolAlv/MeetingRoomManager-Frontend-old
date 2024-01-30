import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserResponce } from 'src/app/interfaces/user-responce';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-datos-user',
  templateUrl: './datos-user.component.html',
  styleUrls: ['./datos-user.component.css'],
  providers:[ConfirmationService,MessageService]
})
export class DatosUserComponent implements OnInit{

  options: any[] = [{label: 'Inactivo', value: 'false'}, {label: 'Activo', value: 'true'}];

  usuarios!: UserResponce[];

  labelStatus!: string;

  accion: string = "";
  name: string = "";
  titulo: string = "";

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ){ }

  ngOnInit(): void {
    this.cargarUsuarios();

    this.activatedRoute.data.subscribe(datos =>{
      this.accion = datos['accion'];
      this.name = datos['name'];
      this.titulo = datos['titulo'];
    });
  }


  cargarUsuarios(){
    this.usuarioService.AllUsuarios().subscribe({
      next: (usuariosAux: UserResponce[]) => {
        this.usuarios = usuariosAux;
      },
      error: err => {
        console.log("Error: ", err);
      },
      complete: () => {
      }
    })
  }

  getSeverity(estado:boolean){
    if(estado){
      return 'success';
    } else{
      return 'danger';
    }
  }

  getEstado(estado:boolean){
    if(estado){
      return 'Activo';
    } else{
      return 'Inactivo';
    }
  }

  volver(){
    this.router.navigateByUrl("admin");
  }

  cambioStatus(email: string,estado:boolean){

    this.usuarioService.activarUser(!estado,email).subscribe({
      next: (data) => {
        console.log("Modifico estado User y me devuelve: ", data);
      },
      error: err => console.log("Error al modificar el estado de Usuario: ", err),
      complete: () => {
      }
    })
  }

  confirmo(evento: any,email: string,estado:boolean){
    let msm: string = (estado) ? 'desactivar': 'activar';
    let msmAux: string = (estado) ? 'desactivo': 'activo';

    this.confirmationService.confirm({
      target: evento.target as EventTarget,
      message: `Quieres ${msm} el usuario?`,
      header: 'Baja usuario',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      rejectIcon:"none",
      rejectButtonStyleClass:"p-button-text",
      accept: () => {
          this.cambioStatus(email,estado);
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: `El Usuario esta ${msmAux}`, life: 5000 });
          window.location.reload();
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Operacion rechazada', life: 3000 });
      }
  });
  }
}
