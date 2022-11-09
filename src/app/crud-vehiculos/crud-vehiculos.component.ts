import { Component } from '@angular/core';
import { RequestBackendService } from '../request-backend.service';

interface vehiculo {
  idVehiculo: string;
  marca: string;
  modelo: string;
  cilindraje: string;
}

@Component({
  selector: 'app-crud-vehiculos',
  templateUrl: './crud-vehiculos.component.html'
})
export class CrudVehiculosComponent {

  userCurrent: vehiculo = { idVehiculo: '', marca: '', modelo: '', cilindraje: '' }
  
  listOfData: vehiculo[] = [];

  constructor(private requestBack: RequestBackendService) {
    this.getVehiculos();

  }

  getVehiculos() {
    this.requestBack.getData('vehiculos').subscribe(

      (data) => {
        this.listOfData = data;
      },
      (error) => {
        console.log('error: ' + error)
        this.listOfData = [];
      }

    )

  }


}
