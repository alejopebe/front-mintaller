import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RequestBackendService } from 'src/app/servicios/request-backend.service';
import { format } from 'date-fns'
import Swal from 'sweetalert2'
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import { Subscription } from 'rxjs';
import { ModeloIdentificar } from 'src/app/modelos/identificar.modelo';

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

interface Revision {
  idRevision: string,
  fecha: string,
  estado: string,
  vitacora: {
    liquidoFrenos: string,
    liquidoRefrigerante: string,
    liquidoDireccion: string,
    aontaciones: string
  },
  repuestos: [

  ],
  vehiculoId: string,
  sedeId: string,
  usuarioId: string,
  propietarioId: string
}





@Component({
  selector: 'app-revisiones',
  templateUrl: './revisiones.component.html',
  styleUrls: ['./revisiones.component.scss']
})
export class RevisionesComponent implements OnInit {

  nombre?: string = '';
  idUsuario?: string = '';
  subs: Subscription = new Subscription();

  //modal
  isVisible = false;
  isConfirmLoading = false;

  campoBuscar = '';

  formRevision: FormGroup = new FormGroup({});

  listOfData: Revision[] = [];



  currentRevision = {
    idRevision: "",
    estado: "",
    fecha: "",
    vitacora: {
      liquidoFrenos: "123",
      liquidoRefrigerante: "800",
      liquidoDireccion: "234",
      aontaciones: ""
    },
    repuestos: [
      {
        marca: "Chana",
        Cantidad: 0,
        tipo: "Filtro de Aceite",
        precio: 0
      }
    ],
    vehiculoId: "",
    sedeId: "",
    usuarioId: this.idUsuario
  }


  currentUsuario?= '';

  sedes: any = [];
  currentSede = '';

  misVehiculos: any = [];


  constructor(private requestBack: RequestBackendService, private fb: FormBuilder,
    private seguridadService: SeguridadService,
    ) {

    this.subs = this.seguridadService.
      ObtenerDatosUsuarioEnSesion().subscribe((datos: ModeloIdentificar) => {
        this.currentUsuario = datos.datos?.id;
        this.nombre = datos.datos?.nombre;
      })

    this.getRevisiones();
    this.getVehiculos();
    this.getSedes()

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
        }, {
          marca: "",
          Cantidad: 0,
          tipo: "0",
          precio: 3000
        }
      ]],

      vehiculoId: "",
      sedeId: "",
      usuarioId: "",
      propietarioId: this.currentUsuario,
    })


  }

  ngOnInit(): void { }

  //::::: Obtine los vehículos
  //::::: Obtine a los usuarios
  getRevisiones() {
    const entity = 'revisions?';
    this.requestBack.getData(entity).subscribe({
      next: (data) => {
        //('next');
        this.listOfData = data.filter((item: { propietarioId: string }) => item.propietarioId === this.currentUsuario);
        //(this.listOfData)
        //this.options = data;
      },

      error: (error) => {
        //('error: ' + error);
        this.listOfData = [];
      },
      complete: () => {
        //('complete');
      },
    });
  }

  //::::: Obtine los vehículos
  getVehiculos() {
    this.requestBack.getData('usuarios/' + this.currentUsuario + '/vehiculos').subscribe(
      (data) => {
        this.misVehiculos = data;
        //(this.misVehiculos)
      },
      (error) => {
        //('error: ' + error)
        this.misVehiculos = [];
      })
  }




  //::::: POST de vehiculo
  saveRevision(): void {
    const datosVehiculo = this.formRevision.getRawValue();
    datosVehiculo['fecha'] = new Date(datosVehiculo['fecha']);
    //datosUser['fechaNacimiento'] = new Date(datosUser['fechaNacimiento']);
    //datosUser['sedeId'] = this.currentSede;

    this.requestBack.addData('revisions?', JSON.stringify(datosVehiculo)).subscribe({
      next: (data) => {
        ////(data);
        // this.getUsuarios();
        const cloneList = JSON.parse(JSON.stringify(this.listOfData));
        this.isVisible = false;
        cloneList.unshift(data);
        this.listOfData = cloneList;
        // this.isVisible = false;

        Toast.fire({
          icon: 'success',
          title: 'Revision agendada exitosamente.'
        })
      },
      error: (error) => {
        //('error: ' + error);
        this.listOfData = [];
      },
      complete: () => {
        //('complete');
      },
    });
  }



  deleteRevision(code: string): void {

    Swal.fire({
      title: '¿Estas seguro?',
      text: "Una vez eliminado no podras recuperarlo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, elimínalo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.requestBack.deleteData('revisions', code).subscribe({
          next: (data) => {
            const cloneList = JSON.parse(JSON.stringify(this.listOfData));
            for (const i in cloneList) {
              if (cloneList[i].idRevision == code) {
                cloneList.splice(Number(i), 1);
                break;
              }
            }
            this.listOfData = cloneList;
          },
          error: (error) => {
            ('error: ' + error);
            this.listOfData = [];
          },
          complete: () => {
            console.log('complete');
          },
        });

        // alert mensaje
        Toast.fire({
          icon: 'success',
          title: 'Revision eliminado exitosamente.'
        })
      }
    })

  }

  //::::: Obtener sedes
  getSedes() {
    this.requestBack.getData('sedes').subscribe({
      next: (data) => {
        this.sedes = data;
        ////(data)
        this.currentSede = data[1].idSede;
        //this.getRevisiones();
      },
      error: (error) => {
        //('error: ' + error);
        this.sedes = [];
      },
      complete: () => {
        //('complete');
      },
    });
  }








  //::::: Modal de agregar usuario
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    //('Button ok clicked!');
    this.isVisible = false;

  }

  handleCancel(): void {
    //('Button cancel clicked!');
    this.isVisible = false;
  }


  /// Offcanva
  visible = false;

  open(revision: Revision): void {
    this.visible = true;
    ////(user);
    this.currentRevision = JSON.parse(JSON.stringify(revision));
  }


  close(): void {
    this.visible = false;
  }

  //:::: Formato fecha

  formatDate(dateString: string): string {
    const date = new Date(dateString)
    return format(date, 'd-LLL-YYY - pp')
  }


}
