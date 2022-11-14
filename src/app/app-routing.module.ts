import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [

  {path: '', redirectTo: 'login', pathMatch: 'full'},
  
  {path: 'login', component: LoginComponent},
  {path: 'register', component: SignupComponent},

  {path: 'administracion', loadChildren: () => import('./modulos/administracion/administracion.module').then
  ( (m)=> m.AdministracionModule )}

















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
