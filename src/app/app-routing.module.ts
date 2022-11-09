import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CrudUsuariosComponent } from './crud-usuarios/crud-usuarios.component';
import { CrudVehiculosComponent } from './crud-vehiculos/crud-vehiculos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
  {
    path: '', 
    component: PagesComponent,
    children: [
      { path: 'Usuarios', component: CrudUsuariosComponent},
      { path: 'Vehiculos', component: CrudVehiculosComponent},
      { path: 'Dashboard', component: DashboardComponent},
      {path: '', redirectTo: '/Dashboard', pathMatch: 'full'}
    ]
  },




  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},





  //{ path: 'Dashboard', loadChildren: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
