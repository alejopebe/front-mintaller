import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloIdentificar } from '../modelos/identificar.modelo';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  url = 'http://localhost:3000/';

  constructor(private http: HttpClient ) { 

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
    let stringDatos = JSON.stringify(datos);

    localStorage.setItem("datosSesion", stringDatos);
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
    localStorage.removeItem("datosSesion")
  }

}
