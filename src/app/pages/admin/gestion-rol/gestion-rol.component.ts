import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RolResponce } from 'src/app/interfaces/rol-responce';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-gestion-rol',
  templateUrl: './gestion-rol.component.html',
  styleUrls: ['./gestion-rol.component.css'],
  providers: [MessageService],
  animations: []
})
export class GestionRolComponent implements OnInit{

  roles!: RolResponce[];

  selectedRol!: RolResponce;

  disabled: boolean = false;
  hidden: boolean = false;
  buttonDisabled: boolean = false;

  rolForm: FormGroup;
  accion: string = "";
  name: string = "";
  titulo: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private rolService: RolService,
    private messageService: MessageService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ){
    //console.log("constructor de gestion-rol");
    this.rolForm = this.formBuilder.group({
      idRol: [{
        value: 0,
        //disabled: true
      }, Validators.required],
      nombreRol:["", Validators.required],
      descripcionRol: ["",Validators.required]
    });
  }
  ngOnInit(): void {
    //console.log("On-Init de gestion-rol");
    this.activatedRoute.data.subscribe(datos =>{
      //console.log("Datos entrada ACCION: ", datos );
      this.accion = datos['accion'];
      this.name = datos['name'];
      this.titulo = datos['titulo'];
    });
    //Deshabilitamos el boton de accion
    this.disabled = true;
    //damos valor 0 inicial al campo ID.
    this.rolForm.controls['idRol'].setValue(0);
    this.rolForm.controls['idRol'].disable();

    //Ocultamos para la accion NEW el div de busqueda de Roles.
    this.hidden = false;
    if(this.accion =='new'){
      this.hidden = true;
      this.disabled = false;
    } 

    //Cargamos lo roles en caso de acciones eliminar y actualizar
    if(this.accion != 'new'){
      this.cargarRoles();
    }
    
  };

  onSubmit() {
    switch(this.accion){
      case 'new':{
        console.log("estamos en un caso de alta de rol");
        this.rolService.altaRol(this.rolForm.value).subscribe({
          next: (newRol: RolResponce) => { 
                  this.cargarFormulario(newRol);
                  this.messageService.add({severity:'success', summary:'Alta Rol', detail:`Rol ${newRol.nombreRol} creado correctamente`});
                },
          error: error => { 
            this.messageService.add({severity:'error', summary:'Error en Campos de entrada', detail: error.error.mensaje});
          },
          complete: () => { 
            //deshabilitamos los campos del form para que no puedan modificarse
            this.disabledCampos();
          }
        });
        break;
      }
      case 'upd':{
        //console.log("estamos en un caso de update rol");
        if(this.rolForm.controls['idRol'].value != 0){
          this.selectedRol.nombreRol = this.rolForm.controls['nombreRol'].value;
          this.selectedRol.descripcionRol = this.rolForm.controls['descripcionRol'].value;
        
          this.rolService.updtRol(this.selectedRol).subscribe({
            next: (rolUpd:RolResponce) =>{ 
              this.messageService.add({severity:'success', summary:'Actualizacion Rol', detail:`Rol ${rolUpd.nombreRol} actualizado correctamente`});
            },
            error: (err) =>{ 
              this.messageService.add({severity:'error', summary:'Error en Campos de entrada', detail: err.error.mensajeError});
            },
            complete: () =>{ 
              this.cargarRoles();
              this.disabledCampos();
            }
          });
        } else{
          console.log("identificador igual a 0: ");
        }
        break;
      }
      case 'del':{
        console.log("estamos en un caso de delete de rol");
        this.rolService.deleteRol(this.selectedRol.idRol).subscribe({
          next: (data:any) => { 
            console.log("Datos recibidos: ", data);
            this.messageService.add({severity:'success', summary:'Borrar Rol', detail: data['Mensaje']});
          },
          error: err => {
            console.log( "Error al borrar rol: ", err );
            this.messageService.add({severity:'error', summary:'Error en Campos de entrada', detail: err.error.mensajeError});
          },
          complete: () =>{
              console.log ("Se ha completado el borrado del Rol") 
              this.cargarRoles();
              this.disabledCampos();
              this.rolForm.controls['idRol'].setValue(0);
              this.rolForm.controls['nombreRol'].setValue("");
              this.rolForm.controls['descripcionRol'].setValue("");
          }
        });
        break;
      }
    }
    //this.rolForm.reset();

    console.warn('Your order has been submitted', this.rolForm.value);
  }

  volver(){
    this.router.navigateByUrl("admin");
  }

  cargarRoles(){
    this.rolService.buscarRoles().subscribe({
      next: (roles:any) =>{
    //    console.log("Roles cargados en pagina: ", roles);
        this.roles = roles;
      },
      error: err => console.log("Error: ", err),
      complete: () => console.log("Completed el get de Roles")
    });
  }

  rolSeleccionado(rol: RolResponce){
    console.log("Datos que recibo al seleccionar un rol: ", rol);
    this.cargarFormulario(rol);
    this.enableCampos();
    
  }

  cargarFormulario(rol:RolResponce){
    this.rolForm.controls['idRol'].setValue(rol.idRol);
    this.rolForm.controls['nombreRol'].setValue(rol.nombreRol);
    this.rolForm.controls['descripcionRol'].setValue(rol.descripcionRol);

    this.selectedRol = rol;    
  }

  disabledCampos(){
    this.disabled = true;
    this.rolForm.controls['descripcionRol'].disable();  
    this.rolForm.controls['nombreRol'].disable();
  }

  enableCampos(){
    this.disabled = false;
    this.rolForm.controls['descripcionRol'].enable();  
    this.rolForm.controls['nombreRol'].enable();
  }
}
