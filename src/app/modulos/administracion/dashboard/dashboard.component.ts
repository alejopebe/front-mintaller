import { Component } from '@angular/core';
import { RequestBackendService } from '../../../request-backend.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent {

  totalU = {count: ''};
  totalV= {count: ''};

  constructor(private requestBack: RequestBackendService) {
    this.totalUsuarios();
    this.totalVehiculos();
  }

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

  totalVehiculos() {
    this.requestBack.getData('vehiculos/count').subscribe(
      (data) => {
        this.totalV = data;
      },
      (error) => {

      }
    )
  }
  

}
