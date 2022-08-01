import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Habitante } from '../models/habitante-model';

@Injectable({
  providedIn: 'root'
})
export class HabitantesService {

  private readonly url = `${environment.apiUrl}/habitantes/`;
  constructor(private readonly http: HttpClient) { }

  getAllHabitants(): Observable<Habitante[]> {
    return this.http.get<Habitante[]>(this.url);
  }

  SaveHabitant(habitant: Habitante): Observable<Habitante> {
    return this.http.post<Habitante>(this.url, habitant);
  }

  updateHabitante(habitant: Habitante): Observable<Habitante> {
    return this.http.put<Habitante>(this.url, habitant);
  }

  delete(habitant: Habitante): Observable<void> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: habitant
    };
    return this.http.delete<void>(this.url, options);
  }
}
