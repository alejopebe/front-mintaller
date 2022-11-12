import { Component, OnInit } from '@angular/core';
import { RequestBackendService } from 'src/app/request-backend.service';

interface Vehiculo {
  idVehiculo: string;
  tipo: string,
  marca: string;
  modelo: number;
  cilindraje: number;
  numeroPasajeros: number;
  paisOrigen: string;
  descripcion: string,
  usuarioId: string
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  currentUsuario = '9090'

  listOfData: Vehiculo[] = [];

  mangos = ['pera','Manzana']


    currentVehicle: Vehiculo = { 
    idVehiculo: '', 
    tipo: '',
    marca: '', 
    modelo: 0, 
    cilindraje: 0,
    numeroPasajeros: 0,
    paisOrigen: '',
    descripcion: '',
    usuarioId: ''
  }


  constructor(private requestBack: RequestBackendService) { 

        this.getVehiculos();

  }

  ngOnInit(): void {


  }


  getVehiculos() {
    this.requestBack.getData('usuarios/' + this.currentUsuario + '/vehiculos').subscribe(
      (data) => {
        this.listOfData = data;
        console.log(this.listOfData)
      },
      (error) => {
        console.log('error: ' + error)
        this.listOfData = [];
      })
  }


  clickUser(vehiculo: Vehiculo): void {
    console.log(vehiculo);
    this.currentVehicle = JSON.parse(JSON.stringify(vehiculo));
  }





  // getVehiculos() {

  //   const url = "http://localhost:3000/usuarios/9090/vehiculos";
  //   window
  //   .fetch(url)
    
  //   .then((repuesta) => repuesta.json())

  //   .then(respuestaJson =>{

  //     const todosLosItems: HTMLDivElement[] = []

  //     respuestaJson.forEach((item: string | any) => {
        
  //       const placa = document.createElement('h3');
  //       placa.textContent = item.idVehiculo

  //       const marca = document.createElement('h4');
  //       marca.textContent = item.marca

  //       const container = document.createElement("div");
  //       container.append(placa, marca);

  //       todosLosItems.push(container);

  //     });

  //     const padre: any = document.querySelector("#vehiculos-list")
  //     padre.append(...todosLosItems);
  //   })


  // }



}
