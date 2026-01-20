import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ViaturaOperacionalModel } from './viatura-operacional-model';
import { NomeTotalModel } from './nome-total-model';
import { NomeTipoTotalModel } from './nome-tipo-total-model';

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

  listarPorviaturaTipoComandoRegional(): Observable<NomeTipoTotalModel[]> {
    return this.http.get<NomeTipoTotalModel[]>(`${this.apiUrl}/viaturaTipoComandoRegional`);
  }

  listarViaturaTipoUnidadeOperacional(): Observable<NomeTipoTotalModel[]> {
    return this.http.get<NomeTipoTotalModel[]>(`${this.apiUrl}/viaturaTipoUnidadeOperacional`);
  }

  listarviaturaPorUnidadeOperacional(): Observable<NomeTotalModel[]> {
    return this.http.get<NomeTotalModel[]>(`${this.apiUrl}/viaturaPorUnidadeOperacional`);
  }

  listarviaturaPorTipo(): Observable<NomeTotalModel[]> {
    return this.http.get<NomeTotalModel[]>(`${this.apiUrl}/viaturaPorTipo`);
  }

}
