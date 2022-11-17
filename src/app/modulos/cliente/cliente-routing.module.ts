import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { InicioComponent } from '../administracion/us-inicio/inicio.component';
import { AgendaRevisionComponent } from './agenda-revision/agenda-revision.component';

const routes: Routes = [

  {path: '', component: LayoutComponent,
  children: [
    { path: 'agenda-revision', component: AgendaRevisionComponent}
  ]

}
  // {path: '', redirectTo: 'agenda-revision', pathMatch: 'full'},
  // 


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class ClienteRoutingModule { }
