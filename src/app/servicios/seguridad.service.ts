import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ModeloIdentificar } from '../modelos/identificar.modelo';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  url = 'http://localhost:3000/';
  
  datosUSuariosEnSesion = new BehaviorSubject<ModeloIdentificar>(new ModeloIdentificar());

  constructor(private http: HttpClient ) { 
    this.VerificarsesionActual();

  }

  VerificarsesionActual(){
    let datos = this.ObtenerSesion();
    if(datos){
      this.RefrecarDatosSesion(datos)
    }
  }

  RefrecarDatosSesion(datos: ModeloIdentificar){

    this.datosUSuariosEnSesion.next(datos);
  }



  ObtenerDatosUsuarioEnSesion(){
    return this.datosUSuariosEnSesion.asObservable();
  }

  Identificar(usuario: string, contrasenia: string): Observable<ModeloIdentificar>{
    return this.http.post<ModeloIdentificar>(this.url + 'identificarUSuario',{

      usuario: usuario,
      contrasenia: contrasenia
    },{
      headers: new HttpHeaders({

      })
    })
  }

  GuradarSesion(datos: ModeloIdentificar){
    datos.estaIdentificado = true;
    let stringDatos = JSON.stringify(datos);
    localStorage.setItem("datosSesion", stringDatos);

    this.RefrecarDatosSesion(datos);
  }

  ObtenerSesion(){
    let stringDatos = localStorage.getItem("datosSesion");

    if(stringDatos){
      let datos = JSON.parse(stringDatos);
      return datos;
    } else{
      return null;
    }
  }

  EliminarSesion(){
    localStorage.removeItem("datosSesion");
    this.RefrecarDatosSesion(new ModeloIdentificar)


  }

  InicioSesion(){

    let stringDatos = localStorage.getItem("datosSesion");
    return stringDatos;

  }

}
