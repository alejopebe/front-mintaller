import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CerrarSesionComponent } from './modulos/auth/cerrar-sesion/cerrar-sesion.component';
import { LoginComponent } from './modulos/auth/login/login.component';
import { RegisterComponent } from './modulos/auth/register/register.component';

const routes: Routes = [

  {path: '', redirectTo: 'seguridad', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},

  {
    path: 'cerrarSesion', component: CerrarSesionComponent
  },

  {path: 'administracion', loadChildren: () => import('./modulos/administracion/administracion.module').then
  ( (m)=> m.AdministracionModule )},

  {path: 'cliente', loadChildren: () => import('./modulos/cliente/cliente.module').then
  ( (m)=> m.ClienteModule )},
  
  {path: 'seguridad', loadChildren: () => import('./modulos/auth/auth.module').then
  ( (m)=> m.AuthModule)}

















  // {
  //   path: '', component: PagesComponent,
  //   children: [
  //     { path: 'Usuarios', component: CrudUsuariosComponent},
  //     { path: 'Vehiculos', component: CrudVehiculosComponent},
  //     { path: 'Dashboard', component: DashboardComponent},
  //     {path: 'Revisiones', component: RevisionesComponent},
  //     {path: '', redirectTo: '/Dashboard', pathMatch: 'full'}
  //   ]
  // },

  // {
  //   path: 'Usuario', component: UsuarioComponent,
  //   children: [
  //     { path: 'inicio', component: InicioComponent},
  //     { path: 'mis-vehiculos', component: MisVehiculosComponent },
  //     { path: '', redirectTo: 'inicio', pathMatch: 'full'}
  //   ]
  // },

  // { path: 'login', component: LoginComponent},
  // { path: 'signup', component: SignupComponent},

  //{ path: 'Dashboard', loadChildren: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
