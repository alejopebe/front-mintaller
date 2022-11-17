import { Component, OnInit, ɵisDefaultChangeDetectionStrategy } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModeloIdentificar } from '../modelos/identificar.modelo';
import { SeguridadService } from '../servicios/seguridad.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  sesionIniciada: boolean = false;
  esAdmin: boolean = false;
  rol?: string = '';



  nombre?: string = '';
  idUsuario?: string = '';
  subs: Subscription = new Subscription();

  isCollapsed = false;

  constructor(
    private seguridadService: SeguridadService,
    private router: Router
    
    ) { }

  ngOnInit(): void {

    this.subs = this.seguridadService.
    ObtenerDatosUsuarioEnSesion().subscribe((datos: ModeloIdentificar) =>{
      this.sesionIniciada = datos.estaIdentificado;

      this.idUsuario = datos.datos?.id;
      this.nombre = datos.datos?.nombre;
      //console.log(datos)

      this.rol = datos.datos?.rol;


      if(datos.datos?.rol === "1"){
        this.esAdmin = true;
      }

      // if(datos.estaIdentificado){
      //   this.sesionIniciada = true
      // } else {
      //   this.sesionIniciada= false
      // }
    })

    if(this.sesionIniciada){
      if(this.rol === '3'){
        this.router.navigate(['/administracion/revisiones']);
      }
    } else{
      this.router.navigate(['/']);
    }

  }

}
