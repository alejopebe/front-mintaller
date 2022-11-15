import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

const CryptoJS = require("crypto-js");

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validateForm!: UntypedFormGroup;

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);

      let correo = this.validateForm.controls['correo'].value;
      let password = this.validateForm.controls['password'].value;
      //let passwordCifrada = CryptoJS.MD5(password).toString()

      this.ServicioSeguridad.Identificar(correo, password).subscribe(
        (datos:any) => {
          this.ServicioSeguridad.GuradarSesion(datos);
        }, (error:any) =>{
          alert("No no no !")
        })



    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }


  constructor(
    private fb: UntypedFormBuilder,
    private ServicioSeguridad: SeguridadService
    ) { }

  ngOnInit(): void {

    this.validateForm = this.fb.group({
      correo: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      //remember: [true]
    });

  }

}
