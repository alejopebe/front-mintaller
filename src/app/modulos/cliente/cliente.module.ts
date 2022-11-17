import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { AgendaRevisionComponent } from './agenda-revision/agenda-revision.component';


@NgModule({
  declarations: [
    AgendaRevisionComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule
  ]
})
export class ClienteModule { }
