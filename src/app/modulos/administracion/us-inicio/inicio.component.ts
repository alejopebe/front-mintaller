import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RequestBackendService } from 'src/app/servicios/request-backend.service';


interface Vehiculo {
  idVehiculo: string;
  tipo: string,
  marca: string;
  modelo: number;
  cilindraje: number;
  numeroPasajeros: string;
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


  // modal
  isVisible = false;
  isConfirmLoading = false;
  currentUsuario = '66666666'



  listOfData: Vehiculo[] = [];

    currentVehicle: Vehiculo = { 
    idVehiculo: '', 
    tipo: '',
    marca: '', 
    modelo: 0, 
    cilindraje: 0,
    numeroPasajeros: '',
    paisOrigen: '',
    descripcion: '',
    usuarioId: ''
  }

  formRevision: FormGroup = new FormGroup({});

  constructor(private requestBack: RequestBackendService,private fb: FormBuilder) { 

        this.getVehiculos();

        this.formRevision = this.fb.group({

          fecha: [new Date()],
          estado: "Pendiente",
          vitacora: {
            liquidoFrenos: "",
            liquidoRefrigerante: "",
            liquidoDireccion: "",
            anotaciones: ""
          },
          repuestos: [[
            {
              marca: "",
              Cantidad: 0,
              tipo: "",
              precio: 3000
            },{
              marca: "",
              Cantidad: 0,
              tipo: "0",
              precio: 3000
            }
          ]],
    
          vehiculoId: "",
          sedeId: "A123",
          usuarioId: "66666666"
        })

  }

  ngOnInit(): void {


  }


  getVehiculos() {
    this.requestBack.getData('usuarios/' + this.currentUsuario + '/vehiculos').subscribe(
      (data) => {
        this.listOfData = data;
        console.log("Que"+ this.listOfData)
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


      //::::: POST de vehiculo
      saveRevision(): void {

      const datosVehiculo = this.formRevision.getRawValue();
      datosVehiculo['fecha'] = new Date(datosVehiculo['fecha']);
      
      //datosUser['sedeId'] = this.currentSede;
  
      this.requestBack.addData('revisions?', JSON.stringify(datosVehiculo)).subscribe({
        next: (data) => {
          //console.log(data);
          // this.getUsuarios();
          const cloneList = JSON.parse(JSON.stringify(this.listOfData));
          cloneList.unshift(data);
          this.listOfData = cloneList;
          // this.isVisible = false;
  
          // Toast.fire({
          //   icon: 'success',
          //   title: 'Vehículo agregado exitosamente.'
          // })
        },
        error: (error) => {
          console.log('error: ' + error);
          this.listOfData = [];
        },
        complete: () => {
          console.log('complete');
        },
      });
    }








  //::::: Seleccionar usuario tabla y rellanar los inputs
  selectVehiculo(user: any): void {
    this.formRevision.patchValue(user);
    this.isVisible = true;
  }



  //::::: Modal de agregar usuario
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

}
