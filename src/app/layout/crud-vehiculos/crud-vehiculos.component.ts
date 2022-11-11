import { Component } from '@angular/core';
import { RequestBackendService } from '../../request-backend.service';


interface Vehiculo {
  idVehiculo: string;
  tipo: string,
  marca: string;
  modelo: string;
  cilindraje: string;
  numeroPasajeros: string;
  paisOrigen: string;
  descripcion: string,
  usuarioId: string
}

@Component({
  selector: 'app-crud-vehiculos',
  templateUrl: './crud-vehiculos.component.html',
  styleUrls: ['./crud-vehiculos.component.scss']
})


export class CrudVehiculosComponent {

  isVisible = false;
  isConfirmLoading = false;

  currentVehicle: Vehiculo = { 
    idVehiculo: '', 
    tipo: '',
    marca: '', 
    modelo: '', 
    cilindraje: '',
    numeroPasajeros: '',
    paisOrigen: '',
    descripcion: '',
    usuarioId: ''
  }

  listOfData: Vehiculo[] = [];

  constructor(private requestBack: RequestBackendService) {

    this.getVehiculos();

  }

//::::: Obtine los vehículos
  getVehiculos() {
    this.requestBack.getData('vehiculos').subscribe(

      (data) => {
        this.listOfData = data;
      },
      (error) => {
        console.log('error: ' + error)
        this.listOfData = [];
      })
  }



//::::: Selecciona un vehículo de la tabla
  clickUser(vehiculo: Vehiculo): void {
    console.log(vehiculo);
    this.currentVehicle = JSON.parse(JSON.stringify(vehiculo));
  }




  
  //::::: modal de agregar usuario
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;

  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }


//:::::  Offcanva
  visible = false;

  open(user: Vehiculo): void {
    this.visible = true;
    //console.log(user);
    this.currentVehicle = JSON.parse(JSON.stringify(user));
  }

  close(): void {
    this.visible = false;
  }

}
