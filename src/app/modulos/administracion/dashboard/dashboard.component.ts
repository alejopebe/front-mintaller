import { Component } from '@angular/core';
import { filter } from 'rxjs';
import { RequestBackendService } from '../../../servicios/request-backend.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent {

  totalU = {count: ''};
  totalV= {count: ''};
  totalR = {count: ''};
  rol = "2"

  constructor(private requestBack: RequestBackendService) {
    this.totalUsuarios();
    this.totalVehiculos();
    this.totalRevisiones();
  }

//::::: Contar usuarios
  totalUsuarios() {

    this.requestBack.getData('usuarios/count').subscribe(

      (data) => {
        this.totalU = data;
      },
      (error) => {
        this.totalU;
      }
    )
  }

//::::: Contar mecánicos
totalMecanicos() {
  this.requestBack.getData('usuarios/count').subscribe(

    (data) => {
      this.totalU = data;
    },
    (error) => {
      this.totalU;
    }
  )
}




  totalVehiculos() {
    this.requestBack.getData('vehiculos/count').subscribe(
      (data) => {
        this.totalV = data;
      },
      (error) => {

      }
    )
  }

  totalRevisiones() {
    this.requestBack.getData('revisions/count').subscribe(

      (data) => {
        this.totalR = data;
      },
      (error) => {

      }
    )
  }
  

}
