import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

//:::: Ng Zorro
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';



@NgModule({
  declarations: [
    RegisterComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    CerrarSesionComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NzFormModule,
    NzButtonModule,
    FormsModule,
    ReactiveFormsModule,
    IconsProviderModule,
    NzInputModule
  ]
})
export class AuthModule { }
