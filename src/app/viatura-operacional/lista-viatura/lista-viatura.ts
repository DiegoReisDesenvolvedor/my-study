import { Component, OnInit, signal } from '@angular/core';
import { ViaturaOperacionalService } from '../viatura-operacional-service';
import { ViaturaOperacionalModel } from '../viatura-operacional-model';
import { CommonModule } from '@angular/common';
import { NomeTotalModel } from '../nome-total-model';

@Component({
  selector: 'app-lista-viatura',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-viatura.html',
  styleUrls: ['./lista-viatura.css']
})
export class ListaViaturaComponent implements OnInit {

  viaturas = signal<ViaturaOperacionalModel[]>([]);

  nomeTotalModel = signal<NomeTotalModel[]>([]);

  constructor(private viaturaService: ViaturaOperacionalService) { }
  
  ngOnInit(): void {
    console.log('ngOnInit');
    this.carregarViaturas();
    this.carregarPorComandoReginal();
  }

  carregarViaturas(): void {
    this.viaturaService.listarViaturas().subscribe({
      next: (viaturas) => {
        console.log('Dados recebidos de VIATURAS:', viaturas);
        this.viaturas.set(viaturas);
       
      },
      error: (error) => {
        console.error('Erro ao carregar viaturas:', error);
      }
    });
  }

  carregarPorComandoReginal(): void {
    this.viaturaService.listarPorComandoReginal().subscribe({
      next: (nomeTotalModel) => {
        console.log('Dados recebidos:', nomeTotalModel);
        this.nomeTotalModel.set(nomeTotalModel);
      
      },
      error: (error) => {
        console.error('Erro ao carregar viaturas por comando reginal:', error);
      }
    });

  } 

}