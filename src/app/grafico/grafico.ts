import { Component, OnInit } from '@angular/core';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ViaturaOperacionalService } from '../viatura-operacional/viatura-operacional-service';
import { NomeTotalModel } from '../viatura-operacional/nome-total-model';


@Component({
  selector: 'app-grafico',
  standalone: true,
  imports: [BaseChartDirective],
  providers: [provideCharts(withDefaultRegisterables())],
  templateUrl: './grafico.html',
  styleUrls: ['./grafico.css'],
})
export class Grafico implements OnInit{

  public barChartLabels: string[] = [];

  public barChartData = {
    labels: [] as string[],
    datasets:[
      { label: "Total de Viaturas por Comando Regional",
        data: [] as number[],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      }
    ]

  };

  constructor( private viaturaService: ViaturaOperacionalService) {}

  ngOnInit(): void {
    this.carregarDadosGrafico();
  }

  carregarDadosGrafico(): void {
    this.viaturaService.listarPorComandoReginal().subscribe({
      next: (dados: NomeTotalModel[]) => {
        this.barChartData.labels = dados.map(item => item.nome);
        this.barChartData.datasets[0].data = dados.map(item => item.total);
        console.log('Dados do gráfico carregados:', this.barChartData);
      },
      error: (error) => {
        console.error('Erro ao carregar dados do gráfico:', error);
      }
    });
  }

 

  public barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

}
