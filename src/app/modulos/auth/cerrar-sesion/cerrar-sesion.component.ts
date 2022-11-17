import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-cerrar-sesion',
  templateUrl: './cerrar-sesion.component.html',
  styles: [
  ]
})
export class CerrarSesionComponent implements OnInit {

  constructor(private seguridadService: SeguridadService,
    private router: Router) {}

  ngOnInit(): void {

    this.seguridadService.EliminarSesion();
    this.router.navigate(['/']);

  }

}
