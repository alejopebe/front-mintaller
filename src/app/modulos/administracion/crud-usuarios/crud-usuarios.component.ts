import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RequestBackendService } from '../../../servicios/request-backend.service';
import Swal from 'sweetalert2'

interface Person {
  idUsuario: string;
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  correo: string;
  ciudad: string;
  telefono: string;
  rolUsuarioId: string,
  sedeId: string
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
  selector: 'app-crud-usuarios',
  templateUrl: './crud-usuarios.component.html',
  styleUrls: ['./crud-usuarios.component.scss']
})

export class CrudUsuariosComponent implements OnInit {

  isVisible = false;
  isConfirmLoading = false;
  formMode = 'adicion'

  userCurrent: Person = {

    idUsuario: '',
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    correo: '',
    ciudad: '',
    telefono: '',
    sedeId: '',
    rolUsuarioId: ''
  }

  campoBuscar = '';
  listOfData: Person[] = [];


  sedes: any = [];
  roles: any = [];
  currentSede = '';
  currentRol = '';

  formUser: FormGroup = new FormGroup({});

  constructor(

    private requestBack: RequestBackendService,
    private fb: FormBuilder

  ) {

    //this.getUsuarios();
    this.getRoles()
    this.getSedes()

    this.formUser = this.fb.group({
      idUsuario: '',
      nombre: '',
      apellido: '',
      telefono: '',
      correo: "",
      fechaNacimiento: "",
      ciudad: "",
      direccion: "",
      sedeId: this.currentSede,
      rolUsuarioId: ''
    })

  }

  ngOnInit(): void { }


  //::::: Obtine a los usuarios
  getUsuarios(sede: string) {
    const entity = 'sedes/' + sede + '/usuarios';
    this.requestBack.getData(entity).subscribe({
      next: (data) => {
        console.log('next');
        this.listOfData = data.filter((item: { rolUsuarioId: string; sedeId: string }) => item.rolUsuarioId === this.currentRol && item.sedeId === this.currentSede);
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

  //::::: Obtener sedes
  getSedes() {
    this.requestBack.getData('sedes').subscribe({
      next: (data) => {
        this.sedes = data;
        //console.log(data)
        this.currentSede = data[0].idSede;
        this.getUsuarios(this.currentSede);
      },
      error: (error) => {
        console.log('error: ' + error);
        this.sedes = [];
      },
      complete: () => {
        console.log('complete');
      },
    });
  }


  //::::::: Obtener los roles
  getRoles() {
    this.requestBack.getData('rol-usuarios').subscribe({
      next: (data) => {
        this.roles = data;
        this.currentRol = data[2].idRol;
        this.getUsuarios(this.currentRol);
      },
      error: (error) => {
        console.log('error: ' + error);
        this.roles = [];
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  
  //::::: Filtra a los suarios por nombre
  getUsuariosFilter() {
    this.requestBack.getData('usuarios', this.campoBuscar).subscribe({
      next: (data) => {
        console.log('next');
        this.listOfData = data;
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

  clickUser(user: Person): void {
    //console.log(user);
    this.userCurrent = JSON.parse(JSON.stringify(user));
  }














  //::::: Edita a los usuarios
  updateUserName(newUser: Person): void {
    const copiaLista = JSON.parse(JSON.stringify(this.listOfData));

    this.requestBack
      .updateData('usuarios', newUser.idUsuario, JSON.stringify(newUser))
      .subscribe({
        next: (data) => {
          for (const i in copiaLista) {
            if (copiaLista[i].idUsuario == newUser.idUsuario) {
              copiaLista[i] = newUser;
            }
          }
          this.listOfData = copiaLista;
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




  saveUser(): void {
    const datosUser = this.formUser.getRawValue();
    //datosUser['fechaNacimiento'] = new Date(datosUser['fechaNacimiento']);
    datosUser['sedeId'] = this.currentSede;

    this.requestBack.addData('usuarios', JSON.stringify(datosUser)).subscribe({
      next: (data) => {
        //console.log(data);
        // this.getUsuarios();
        const cloneList = JSON.parse(JSON.stringify(this.listOfData));
        cloneList.unshift(data);
        this.listOfData = cloneList;
        this.isVisible = false;

        // alert mensaje
        Toast.fire({
          icon: 'success',
          title: 'Usuario agregado exitosamente.'
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


  //::::: Editar usuario
  editUser(): void {
    const user = this.formUser.getRawValue();

    this.requestBack.updateData('usuarios', user.idUsuario, user).subscribe(
      {
        next: (data) => {

          this.getUsuarios(this.currentSede);
          this.isVisible = false;

          // alert mensaje
          Toast.fire({
            icon: 'success',
            title: 'Usuario editado exitosamente'
          })
        },
        error: (error) => {
          console.log('error: ' + error);
          this.listOfData = [];

          // alert mensaje
          Toast.fire({
            icon: 'error',
            title: 'No se pudo editar, intenalo de nuevo.'
          })
        },
        complete: () => {
          console.log('complete');
        },
      });
  }


  //::::: Seleccionar usuario tabla y rellanar los inputs
  selectUserEdit(user: any): void {
    this.formMode = 'edicion';
    this.formUser.patchValue(user);
    this.isVisible = true;
  }


  //::::: Eliminar usuario
  deleteUser(code: string): void {

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

        this.requestBack.deleteData('usuarios', code).subscribe({
          next: (data) => {
            const cloneList = JSON.parse(JSON.stringify(this.listOfData));
            for (const i in cloneList) {
              if (cloneList[i].idUsuario == code) {
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
          title: 'Usuario eliminado exitosamente.'
        })
      }
    })

  }



  //::::: trae los usuario a la sede seleccionada
  changeSede(): void {
    this.getUsuarios(this.currentSede);
  }






  //::::: Modal de agregar usuario
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


  //:::::  Offcanva
  visible = false;

  open(user: Person): void {
    this.visible = true;
    //console.log(user);
    this.userCurrent = JSON.parse(JSON.stringify(user));
  }

  close(): void {
    this.visible = false;
  }

}
