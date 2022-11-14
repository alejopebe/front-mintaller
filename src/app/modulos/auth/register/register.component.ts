import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RequestBackendService } from 'src/app/servicios/request-backend.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registroUsuario: FormGroup = new FormGroup({});
  

  constructor(
    private requestBack: RequestBackendService,
    private fb: FormBuilder
  ) { 

    this.registroUsuario = this.fb.group({
      idUsuario: '',
      nombre: '',
      apellido: '',
      telefono: '',
      correo: "",
      fechaNacimiento: "",
      ciudad: "aaa",
      direccion: "",
      contrasenia: "",
      sedeId: "A000",
      rolUsuarioId: '3'
    })

  }

  ngOnInit(): void {
  }

  saveUser(): void {
    const datosUser = this.registroUsuario.getRawValue();
    //datosUser['fechaNacimiento'] = new Date(datosUser['fechaNacimiento']);
    //datosUser['sedeId'] = this.currentSede;

    this.requestBack.addData('usuarios', JSON.stringify(datosUser)).subscribe({
      next: (data) => {
        // this.getUsuarios();
        //const cloneList = JSON.parse(JSON.stringify(this.listOfData));
        //cloneList.unshift(data);
        //this.listOfData = cloneList;
      },
      error: (error) => {
        console.log('error: ' + error);
        //this.listOfData = [];
      },
      complete: () => {
        console.log('complete');
      },
    });
  }  



}


