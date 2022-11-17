import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracionRoutingModule } from './administracion-routing.module';

import { CalenadarioComponent } from './calenadario/calenadario.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { AgendarRevisionComponent } from './agendar-revision/agendar-revision.component';



@NgModule({
  declarations: [
    CalenadarioComponent,
    AgendarRevisionComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  imports: [
    CommonModule,
    AdministracionRoutingModule,
    NzModalModule
  ]
})
export class AdministracionModule { }
