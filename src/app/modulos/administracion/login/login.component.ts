import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { ModeloIdentificar } from 'src/app/modelos/identificar.modelo';
import { SeguridadService } from 'src/app/servicios/seguridad.service';


const CryptoJS = require("crypto-js");

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  sesionIniciada: boolean = false;
  subs: Subscription = new Subscription();

  validateForm!: UntypedFormGroup;

  submitForm(): void {
    if (this.validateForm.valid) {

      
      let correo = this.validateForm.controls['correo'].value;
      let password = this.validateForm.controls['password'].value;
      let passwordCifrada = CryptoJS.MD5(password).toString()

      console.log('submit', this.validateForm.value);
      this.ServicioSeguridad.Identificar(correo, password).subscribe(
        (datos:any) => {
          this.ServicioSeguridad.GuradarSesion(datos);
          this.router.navigate(['/administracion'])
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
    private ServicioSeguridad: SeguridadService,
    private router: Router,
    private seguridadService: SeguridadService,
    ) { }

  ngOnInit(): void {

    this.validateForm = this.fb.group({
      correo: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      //remember: [true]
    });


    this.subs = this.seguridadService.
    ObtenerDatosUsuarioEnSesion().subscribe((datos: ModeloIdentificar) =>{
      this.sesionIniciada = datos.estaIdentificado;
     
    })

    if(this.sesionIniciada){
      this.router.navigate(['/administracion']);

    } else{
    
    }

  }

}
