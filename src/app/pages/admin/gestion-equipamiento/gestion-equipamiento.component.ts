import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EquipoResponce } from 'src/app/interfaces/equipo-responce';
import { EquipamientoServiceService } from 'src/app/core/services/equipamiento-service.service';

@Component({
  selector: 'app-gestion-equipamiento',
  templateUrl: './gestion-equipamiento.component.html',
  styleUrls: ['./gestion-equipamiento.component.css'],
  providers: [MessageService]
})
export class GestionEquipamientoComponent implements OnInit{

  equipos!: EquipoResponce[];

  selectedEquipo!: EquipoResponce;

  disabled: boolean = false;
  hidden: boolean = false;
  buttonDisabled: boolean = false;

  equipoForm: FormGroup;
  accion: string = "";
  name: string = "";
  titulo: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
    private equipoService: EquipamientoServiceService
  ){
    this.equipoForm = this.formBuilder.group({
      idEquipo: [{
        value: 0,
        //disabled: true
      }, Validators.required],
      nombreEquipo:["", Validators.required],
      descripcionEquipo: ["",Validators.required]
    });
  }
  
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(datos =>{
      //console.log("Datos entrada ACCION: ", datos );
      this.accion = datos['accion'];
      this.name = datos['name'];
      this.titulo = datos['titulo'];
    });

    //Deshabilitamos el boton de accion
    this.disabled = true;
    //damos valor 0 inicial al campo ID.
    this.equipoForm.controls['idEquipo'].setValue(0);
    this.equipoForm.controls['idEquipo'].disable();

    //Ocultamos para la accion NEW el div de busqueda de Roles.
    this.hidden = false;
    if(this.accion =='new'){
      this.hidden = true;
      this.disabled = false;
    } 

    if (this.accion != 'new'){
      this.cargarEquipamiento();
    }
  }

  cargarEquipamiento(){
    this.equipoService.buscarEquipos().subscribe({
      next: (equipos:EquipoResponce[]) =>{
        console.log("Equipamiento recibido: ", equipos);
        this.equipos = equipos;
      },
      error: err => {
        console.log("Error al recibir info de Equipamiento");
      },
      complete: () => {}
    });
  }

  onSubmit() {
    switch(this.accion){
      case 'new':{
        console.log("estamos en un caso de alta de equipamiento");
        this.equipoService.altaEquip(this.equipoForm.value).subscribe({
          next: (newEquipo: EquipoResponce) => { 
                  this.cargarFormulario(newEquipo);
                  this.messageService.add({severity:'success', summary:'Alta Rol', detail:`Rol ${newEquipo.nombreEquipo} creado correctamente`});
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
      case 'upd': {
        console.log("estamos actualizando los datos de un equipamiento");
        if(this.equipoForm.controls['idEquipo'].value != 0){
          console.log("identificador distinto a 0");
          this.selectedEquipo.nombreEquipo = this.equipoForm.controls['nombreEquipo'].value;
          this.selectedEquipo.descripcionEquipo = this.equipoForm.controls['descripcionEquipo'].value;

          this.equipoService.updateEquipo(this.selectedEquipo).subscribe({
            next: (updEquipo: EquipoResponce) => {
              console.log("Equipo actualizado: ", updEquipo);
              this.messageService.add({severity:'success', summary:'Actualizacion Rol', detail:`Equipamiento ${updEquipo.nombreEquipo} actualizado correctamente`});
            },
            error: (err) => {
              this.messageService.add({severity:'error', summary:'Error en Campos de entrada', detail: err.error.mensajeError});
            },
            complete: () => {
              this.cargarEquipamiento();
              this.disabledCampos();
            }
          });
        } else {
          console.log("identificador igual a 0: ");
        }
        break;
      }
      case 'del':{
        console.log("estamos en un caso de delete de equipamiento");
        this.equipoService.deleteEquipo(this.selectedEquipo.idEquipo).subscribe({
          next: (data:any) => { 
            console.log("Datos recibidos: ", data);
            this.messageService.add({severity:'success', summary:'Borrar Equipamiento', detail: data['Mensaje']});
          },
          error: err => {
            console.log( "Error al borrar rol: ", err );
            this.messageService.add({severity:'error', summary:'Error en Campos de entrada', detail: err.error.mensajeError});
          },
          complete: () =>{
              console.log ("Se ha completado el borrado del Equipo") 
              this.cargarEquipamiento();
              this.disabledCampos();
              this.equipoForm.controls['idEquipo'].setValue(0);
              this.equipoForm.controls['nombreEquipo'].setValue("");
              this.equipoForm.controls['descripcionEquipo'].setValue("");
          }
        });
        break;
      }
    }
  }

  volver(){
    this.router.navigateByUrl("admin");
  }

  equipoSeleccionado(equipo: EquipoResponce){
    console.log("Datos que recibo al seleccionar un equipo: ", equipo);
    this.cargarFormulario(equipo);
    this.enableCampos();
  }

  cargarFormulario(equipo:EquipoResponce){
    this.equipoForm.controls['idEquipo'].setValue(equipo.idEquipo);
    this.equipoForm.controls['nombreEquipo'].setValue(equipo.nombreEquipo);
    this.equipoForm.controls['descripcionEquipo'].setValue(equipo.descripcionEquipo);

    this.selectedEquipo = equipo;    
  }

  disabledCampos(){
    this.disabled = true;
    this.equipoForm.controls['descripcionEquipo'].disable();  
    this.equipoForm.controls['nombreEquipo'].disable();
  }

  enableCampos(){
    this.disabled = false;
    this.equipoForm.controls['descripcionEquipo'].enable();  
    this.equipoForm.controls['nombreEquipo'].enable();
  }
}
