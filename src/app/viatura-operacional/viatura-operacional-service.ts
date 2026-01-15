import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ViaturaOperacionalModel } from './viatura-operacional-model';
import { NomeTotalModel } from './nome-total-model';

@Injectable({
  providedIn: 'root',
})
export class ViaturaOperacionalService {

  private apiUrl = 'http://localhost:8080/viatura-operacional';

  constructor(private http: HttpClient) { }

  listarViaturas(): Observable<ViaturaOperacionalModel[]> {
    return this.http.get<ViaturaOperacionalModel[]>(this.apiUrl);
  }

  listarPorComandoReginal(): Observable<NomeTotalModel[]> {
    return this.http.get<NomeTotalModel[]>(`${this.apiUrl}/viaturaPorComandoRegional`);
  }

}
