import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CrudUsuariosComponent } from './layout/crud-usuarios/crud-usuarios.component';
import { CrudVehiculosComponent } from './layout/crud-vehiculos/crud-vehiculos.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { PagesComponent } from './pages/jefe-operaciones/pages.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { RevisionesComponent } from './revisiones/revisiones.component';

const routes: Routes = [
  {
    path: '', component: PagesComponent,
    children: [
      { path: 'Usuarios', component: CrudUsuariosComponent},
      { path: 'Vehiculos', component: CrudVehiculosComponent},
      { path: 'Dashboard', component: DashboardComponent},
      {path: 'Revisiones', component: RevisionesComponent},
      {path: '', redirectTo: '/Dashboard', pathMatch: 'full'}
    ]
  },

  {path: 'Usuario', component: UsuarioComponent},


  
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},





  //{ path: 'Dashboard', loadChildren: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
