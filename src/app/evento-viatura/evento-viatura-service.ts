import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NomeStatusTotalModel } from './interface/nome-status-total-model';
import { ObjectStatusTotalModel } from './interface/object-status-total-model';
@Injectable({
  providedIn: 'root',
})
export class EventoViaturaService {

  private apiUrl = 'http://localhost:8080/evento-atualizado';

  constructor(private http: HttpClient) { }

  listarEventos(): Observable<ObjectStatusTotalModel[]> {
    return this.http.get<ObjectStatusTotalModel[]>(this.apiUrl);
  }
  
}
