import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent implements OnInit {
  
  newUserForm: FormGroup;

  disabled: boolean = false;

  titulo: string = "";
  nombre: string = "";
  accion: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ){
    this.newUserForm = this.formBuilder.group({
      idUser: [{
        value: 0,
        //disabled: true
      }, Validators.required],
      email:["", [Validators.required, Validators.email]],
      passId: ["",[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]]
    });
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(datos =>{
      //console.log("Datos entrada ACCION: ", datos );
      this.accion = datos['accion'];
      this.nombre = datos['name'];
      this.titulo = datos['titulo'];
    });

    this.newUserForm.controls['idUser'].setValue(0);
    this.newUserForm.controls['idUser'].disable();
  }

  onSubmit() {
    console.log("Enviando formulario: ", this.newUserForm.value);

  }

  volver(){
    this.router.navigateByUrl("admin");
  }

}
