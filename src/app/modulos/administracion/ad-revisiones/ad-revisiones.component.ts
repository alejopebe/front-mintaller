import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { format } from 'date-fns';
import { Subscription } from 'rxjs';
import { RequestBackendService } from 'src/app/servicios/request-backend.service';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import Swal from 'sweetalert2';

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
  selector: 'app-ad-revisiones',
  templateUrl: './ad-revisiones.component.html',
  styleUrls: ['./ad-revisiones.component.scss']
})
export class AdRevisionesComponent implements OnInit {

  //Datos sesion
  nombre?: string = '';
  idUsuario?: string = '';
  subs: Subscription = new Subscription();

  listOfData: Revision[] = [];
  mecanicos: any = []

  currentRevision = {
    idRevision: "",
    estado: "",
    fecha: "",
    vitacora: {
      liquidoFrenos: "",
      liquidoRefrigerante: "",
      liquidoDireccion: "",
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
    usuarioId: ""
  }

  formRevision: FormGroup = new FormGroup({});

  constructor(private requestBack: RequestBackendService,
    private seguridadService: SeguridadService,private fb: FormBuilder) {
      
      this.getRevisiones();
      this.getMecanicos();

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
        propietarioId: ""
      })
    }

  ngOnInit(): void {
  }

  getRevisiones() {
    const entity = 'revisions?';
    this.requestBack.getData(entity).subscribe({
      next: (data) => {
        //('next');
        this.listOfData = data;
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


  //::::: Obtine a los usuarios
  getMecanicos() {
    const entity = '/usuarios';
    this.requestBack.getData(entity).subscribe({
      next: (data) => {
        console.log('next');
        this.mecanicos = data.filter((item: { rolUsuarioId: string}) => item.rolUsuarioId === "2");
        //console.log( this.listOfData)
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
  

}
