import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { BaseChartDirective,provideCharts, withDefaultRegisterables  } from 'ng2-charts';
import { EventoViaturaService } from '../evento-viatura-service';
import { NomeStatusTotalModel } from '../interface/nome-status-total-model';
import { ObjectStatusTotalModel } from '../interface/object-status-total-model';

@Component({
  selector: 'app-evento-viatura-grafico',
  standalone: true,
  imports: [BaseChartDirective],
  providers: [provideCharts(withDefaultRegisterables())],
  templateUrl: './evento-viatura-grafico.html',
  styleUrl: './evento-viatura-grafico.css',
})
export class EventoViaturaGrafico implements OnInit {

  public graficoStatusComandoRegional = {
    labels:[] as string[],
    datasets: [] as {
      label: string;
      data: number[];
      backgroundColor: string; 
    }[]
  };

  constructor( private eventoViaturaService: EventoViaturaService, 
    private cdr: ChangeDetectorRef) { }



  ngOnInit(): void {
   this.functionGraficoStatusComandoRegional();
   this.cdr.detectChanges();
    
  }

  public functionGraficoStatusComandoRegional(): void {
    this.eventoViaturaService.listarEventos().subscribe({
      next: (dados: ObjectStatusTotalModel[]) => {

        this.graficoStatusComandoRegional.labels = (dados.map(dado => dado.nome));
        this.graficoStatusComandoRegional.datasets = [];
        const operador: Map<string, number[]> = new Map();

        dados.map((dado,index) => {

          for (const status in dado.total) {

            if (!operador.has(status)) {
              operador.set(status, Array(dados.length).fill(0));
            }
            operador.get(status)![index] = dado.total[status];
          }



        });

        for(const [status, data] of operador.entries()) {
          this.graficoStatusComandoRegional.datasets.push({
            label: status,
            data: data,
            backgroundColor: status.toUpperCase() === 'OPERANTE' ? 'rgba(75, 192, 192, 0.6)' : 'rgba(192, 75, 75, 0.6)' 
          });
        }


      },      error: (erro) => {
        console.error('Erro ao carregar dados do gráfico:', erro);
      }


    });
  }

  /*

  public functionGraficoStatusComandoRegional(): void {
    this.eventoViaturaService.listarEventos().subscribe({
      next: (dados: NomeStatusTotalModel[]) => {
      

        const legenda = dados.map(dado => dado.nome);
        console.log('Legenda:', legenda);

        const operante: number[]=[];
        const inoperante: number[]=[];

        for(const item of dados) {
          const status = item.status.toUpperCase();

          if(status === 'OPERANTE') {
            operante.push(item.total);
            inoperante.push(0);
            console.log('Operante:', operante);
          } else if(status === 'INOPERANTE') {
            inoperante.push(item.total);
            operante.push(0);
            console.log('Inoperante:', inoperante);
          }

        }

        console.log('Dados Operante: estamos aqui', operante);
        console.log('Dados Inoperante:estamos aquiiiii', inoperante);

        
      
        //this.graficoStatusComandoRegional.labels.length = 0;
        this.graficoStatusComandoRegional.labels.push(...legenda);
        //this.graficoStatusComandoRegional.datasets.length = 0;
        //this.graficoStatusComandoRegional.datasets.length = 0;
        this.graficoStatusComandoRegional.datasets.push({
          label: 'Operante',
          data: operante,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        });
        this.graficoStatusComandoRegional.datasets.push({
          label: 'Inoperante',
          data: inoperante,
          backgroundColor: 'rgba(192, 75, 75, 0.6)',
        });

        
      
  
  
    },
      error: (erro) => {
        console.error('Erro ao carregar dados do gráfico:', erro);
      }
  });

  }

  */



  public barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };


}
