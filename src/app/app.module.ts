import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';

import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';

import { LayoutComponent } from './layout/layout.component';

import { CrudUsuariosComponent } from './modulos/administracion/crud-usuarios/crud-usuarios.component';
import { CrudVehiculosComponent } from './modulos/administracion/crud-vehiculos/crud-vehiculos.component';
import { LoginComponent } from './modulos/auth/login/login.component';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { MisVehiculosComponent } from './modulos/administracion/mis-vehiculos/mis-vehiculos.component';
import { RevisionesComponent } from './modulos/administracion/revisiones/revisiones.component';
import { InicioComponent } from './modulos/administracion/us-inicio/inicio.component';
import { AdRevisionesComponent } from './modulos/administracion/ad-revisiones/ad-revisiones.component';
//import { SignupComponent } from './auth/signup/signup.component';
// import { PagesComponent } from './pages/jefe-operaciones/pages.component';
// import { UsuarioComponent } from './pages/usuario/usuario.component';
// import { UserLayoutComponent } from './layout-usuario/user-layout.component';
// import { MisVehiculosComponent } from './layout-usuario/mis-vehiculos/mis-vehiculos.component';
// import { InicioComponent } from './layout-usuario/inicio/inicio.component';

registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    //SignupComponent,
    // UserLayoutComponent,
    CrudUsuariosComponent,
    CrudVehiculosComponent,
    AdRevisionesComponent,

    // PagesComponent,
    // UsuarioComponent,
    LoginComponent,
    MisVehiculosComponent,
    RevisionesComponent,
    InicioComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzTableModule,
    NzDividerModule,
    NzGridModule,
    NzModalModule,
    NzBreadCrumbModule,
    NzButtonModule,
    NzInputModule,
    NzFormModule,
    ReactiveFormsModule,
    NzCheckboxModule,
    NzSelectModule,
    NzSpaceModule,
    NzDrawerModule,
    NzToolTipModule,
    NzAutocompleteModule,
    NzCalendarModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: es_ES }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
