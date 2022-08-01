import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Ciudad } from '../models/ciudad-model';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  private readonly url = `${environment.apiUrl}/ciudades/`;
  constructor(private readonly http: HttpClient) {
    
   }

  getById(id: number): Observable<Ciudad> {
    console.log(this.url)
    return this.http.get<Ciudad>(this.url+id);
  }

  getAllCitys(): Observable<Ciudad[]> {
    console.log(this.url)
    return this.http.get<Ciudad[]>(this.url);
  }

  saveCity(city: Ciudad): Observable<Ciudad> {
    return this.http.post<Ciudad>(this.url, city);
  }

  updateCity(city: Ciudad): Observable<Ciudad> {
    return this.http.put<Ciudad>(this.url, city);
  }

  delete(city: Ciudad): Observable<void> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: city
    };
    return this.http.delete<void>(this.url, options);
  }
}
