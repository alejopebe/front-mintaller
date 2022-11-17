import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { combineLatest } from 'rxjs';
import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';
import { LoginComponent } from '../administracion/login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [

    //{ path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'cerrarSesion', component: CerrarSesionComponent},
    { path: 'register', component: RegisterComponent},
    { path: '', component: LoginComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
