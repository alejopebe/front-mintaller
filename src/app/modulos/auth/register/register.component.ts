import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RequestBackendService } from 'src/app/servicios/request-backend.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer:5000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registroUsuario: FormGroup = new FormGroup({});


  constructor(
    private requestBack: RequestBackendService,
    private fb: FormBuilder,
    private router: Router
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

        // alert mensaje
        Toast.fire({
          icon: 'success',
          title: 'Registro exitoso, revisa tu correo.'
        })

        setTimeout( () => {
          this.router.navigate(['/']);
        }, 6000);


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


