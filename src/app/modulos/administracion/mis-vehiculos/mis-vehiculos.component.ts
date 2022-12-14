import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModeloIdentificar } from 'src/app/modelos/identificar.modelo';
import { RequestBackendService } from 'src/app/servicios/request-backend.service';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import Swal from 'sweetalert2'

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

const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

@Component({
  selector: 'app-mis-vehiculos',
  templateUrl: './mis-vehiculos.component.html',
  styleUrls: ['./mis-vehiculos.component.scss']
})
export class MisVehiculosComponent implements OnInit {

  isVisible = false;
  isConfirmLoading = false;
  formMode = 'adicion'

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

  currentUsuario?= '';

  //::::: inputs select
  tiposVehiculo: any = [];
  currentTipo = '';

  marcaVehiculo: any = [];
  currentMarca = '';



  listOfData: Vehiculo[] = [];

  formVehiculo: FormGroup = new FormGroup({});


  constructor(private requestBack: RequestBackendService, private fb: FormBuilder, private seguridadService: SeguridadService,) {

    this.seguridadService.ObtenerDatosUsuarioEnSesion().subscribe((datos: ModeloIdentificar) => {
      this.currentUsuario = datos.datos?.id;
    })

    this.getVehiculos();
    this.getTipoVehiculo();
    this.getMarcaVehiculo()


    this.formVehiculo = this.fb.group({

      idVehiculo: '',
      tipo: '',
      marca: '',
      modelo: '',
      cilindraje: '',
      numeroPasajeros: '',
      paisOrigen: '',
      descripcion: '',
      usuarioId: this.currentUsuario
    })

  }

  ngOnInit(): void {
  }

  //::::: Obtine los veh??culos
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


  //::::: POST de vehiculo
  saveVehicle(): void {
    const datosVehiculo = this.formVehiculo.getRawValue();
    //datosUser['fechaNacimiento'] = new Date(datosUser['fechaNacimiento']);
    //datosUser['sedeId'] = this.currentSede;

    this.requestBack.addData('vehiculos', JSON.stringify(datosVehiculo)).subscribe({
      next: (data) => {
        //console.log(data);
        // this.getUsuarios();
        const cloneList = JSON.parse(JSON.stringify(this.listOfData));
        cloneList.unshift(data);
        this.listOfData = cloneList;
        this.isVisible = false;

        Toast.fire({
          icon: 'success',
          title: 'Veh??culo agregado exitosamente.'
        })
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


  editVehiculo(): void {
    const vehiculo = this.formVehiculo.getRawValue();

    this.requestBack.updateData('vehiculos', vehiculo.idVehiculo, vehiculo).subscribe(
      {
        next: (data) => {

          this.getVehiculos();
          this.isVisible = false;

          Toast.fire({
            icon: 'success',
            title: 'Veh??culo editado exitosamente.'
          })
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

  //::::: Eliminar veh??culo
  deleteVehiculo(code: string): void {

    Swal.fire({
      title: '??Estas seguro?',
      text: "Una vez eliminado no podras recuperarlo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, elim??nalo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.requestBack.deleteData('vehiculos', code).subscribe({
          next: (data) => {
            const cloneList = JSON.parse(JSON.stringify(this.listOfData));
            for (const i in cloneList) {
              if (cloneList[i].idVehiculo == code) {
                cloneList.splice(Number(i), 1);
                break;
              }
            }
            this.listOfData = cloneList;
          },
          error: (error) => {
            console.log('error: ' + error);
            this.listOfData = [];
          },
          complete: () => {
            console.log('complete');
          },
        });

        // alert mensaje
        Toast.fire({
          icon: 'success',
          title: 'Veh??culo eliminado exitosamente.'
        })
      }
    });
  }


  //::::::: Obtener tipos de veh??culos
  getTipoVehiculo() {
    this.requestBack.getData('tipo-vehiculos').subscribe({
      next: (data) => {
        this.tiposVehiculo = data;
        this.currentTipo = data[0].nombre;
        console.log(data)
      },
      error: (error) => {
        console.log('error: ' + error);
        this.tiposVehiculo = [];
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

    //::::::: Obtener marca de veh??culos
    getMarcaVehiculo() {
      this.requestBack.getData('marca-vehiculos').subscribe({
        next: (data) => {
          this.marcaVehiculo = data;
          this.currentMarca = data[0].nombre;
          //console.log(data)
        },
        error: (error) => {
          console.log('error: ' + error);
          this.marcaVehiculo = [];
        },
        complete: () => {
          console.log('complete');
        },
      });
    }






  //::::: Selecciona un veh??culo de la tabla
  clickUser(vehiculo: Vehiculo): void {
    console.log(vehiculo);
    this.currentVehicle = JSON.parse(JSON.stringify(vehiculo));
  }


  selectVehiculoEdit(user: any): void {
    this.formMode = 'edicion';
    this.formVehiculo.patchValue(user);
    this.isVisible = true;
  }


  //::::: modal de agregar usuario
  showModal(): void {
    this.isVisible = true;
    this.formMode = 'adicion'
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;

  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }


  //::::: Offcanva
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
