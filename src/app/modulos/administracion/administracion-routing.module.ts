import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { AgendarRevisionComponent } from './agendar-revision/agendar-revision.component';
import { CalenadarioComponent } from './calenadario/calenadario.component';
import { CrudUsuariosComponent } from './crud-usuarios/crud-usuarios.component';
import { CrudVehiculosComponent } from './crud-vehiculos/crud-vehiculos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MisVehiculosComponent } from './mis-vehiculos/mis-vehiculos.component';
import { RevisionesComponent } from './revisiones/revisiones.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: 'usuarios', component: CrudUsuariosComponent},
      { path: 'vehiculos', component: CrudVehiculosComponent},
      { path: 'dashboard', component: DashboardComponent},
      { path: 'calendario', component: CalenadarioComponent},
      { path: 'misvehiculos', component: MisVehiculosComponent},
      { path: 'agendarrevision', component: AgendarRevisionComponent},
      
      { path: 'revisiones', component: RevisionesComponent},
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
