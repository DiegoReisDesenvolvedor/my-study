import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ViaturaOperacionalService } from '../viatura-operacional/viatura-operacional-service';
import { NomeTotalModel } from '../viatura-operacional/nome-total-model';
import { NomeTipoTotalModel } from '../viatura-operacional/nome-tipo-total-model';


@Component({
  selector: 'app-grafico',
  standalone: true,
  imports: [BaseChartDirective],
  providers: [provideCharts(withDefaultRegisterables())],
  templateUrl: './grafico.html',
  styleUrls: ['./grafico.css'],
})
export class Grafico implements OnInit{

  public graficoStatusComandoRegional = {
    labels: ["Norte","Sul","Leste","Oeste"],//[] as string[],
    datasets:  [{
      label: "Total de Eventos por Status",
      data: [2,3,4,5],//number[];
      backgroundColor: 'rgba(75, 192, 192, 0.6)', 
    }]
  };



  public graficoAtualizadoViautraPorCR = {
    labels: [] as string[],
    datasets: [] as {
      label: string;
      data: number[];
      backgroundColor: string; 
    }[]
  };



  public graficoAtualizado = {
    labels: [] as string[],
    datasets: [] as {
      label: string;
      data: number[];
      backgroundColor: string; 
    }[]
  };

  public graficoAtualizadoVTR = {
    labels: [] as string[],
    datasets: [] as {
      label: string;
      data: number[];
      backgroundColor: string; 
    }[]
  };

  public graficoviaturaPorUnidadeOperacional = {
    labels: [] as string[],
    datasets: [] as {
      label: string;
      data: number[];
      backgroundColor: string; 
    }[]
  }

  public graficoviaturaPorTipo = {
    labels: [] as string[],
    datasets: [] as {
      label: string;
      data: number[];
      backgroundColor: string; 
    }[]
  }

 
  constructor( private viaturaService: ViaturaOperacionalService,
                private cdr: ChangeDetectorRef) {}
  
  ngOnInit(): void {

    this.funcaograficoTipoCr();
    this.funcaolistarViaturaTipoUnidadeOperacional();
    this.funcaoViaturaPorComandoRegional();
    this.funcaoviaturaPorUnidadeOperacional();
    this.funcaoviaturaPorTipo();
    
  }


  funcaograficoTipoCr(): void {
    this.viaturaService.listarPorviaturaTipoComandoRegional().subscribe({
      next: (dados: NomeTipoTotalModel[]) => {
        this.graficoAtualizado.labels = [];
        this.graficoAtualizado.datasets = [];        

        const mapaTipos: Map<string, number[]> = new Map();
        dados.map((dado, index) => {
          

          for (const tipo in dado.tipoTotal) {
            if (!mapaTipos.has(tipo)) {
              mapaTipos.set(tipo, Array(dados.length).fill(0));
            }
            mapaTipos.get(tipo)![index] = dado.tipoTotal[tipo];
          }


        });

        this.graficoAtualizado.labels = dados.map(dado => dado.nome);
        this.graficoAtualizado.datasets = [];

        for (const [tipo, valores] of mapaTipos) {
          this.graficoAtualizado.datasets.push({
            label: tipo,
            data: valores,
            backgroundColor: this.gerarCorAleatoria()
          });
        }

      }



    });  
}

  funcaolistarViaturaTipoUnidadeOperacional(): void {
    this.viaturaService.listarViaturaTipoUnidadeOperacional().subscribe({
      next: (dados: NomeTipoTotalModel[]) => {
        this.functionGrafico(dados);

      },error: (error) => {
      console.error("Erro ao carregar dados:", error);
      }

    });  
  }

  funcaoViaturaPorComandoRegional(): void {
    this.viaturaService.listarPorComandoReginal().subscribe({
      next: (dados: NomeTotalModel[]) => {
        this.graficoAtualizadoViautraPorCR.labels = [];
        this.graficoAtualizadoViautraPorCR.datasets = []; 

        this.graficoAtualizadoViautraPorCR.labels = dados.map(dado => dado.nome);

        this.graficoAtualizadoViautraPorCR.datasets.push({
          label: 'Total de Viaturas por Comando Regional',
          data: dados.map(dado => dado.total),
          backgroundColor: 'rgba(54, 162, 235, 0.6)' 
        });


      },error: (error) => {
        console.error('Erro ao carregar dados do gráfico:', error);
      }
    }); 
    
  }

  funcaoviaturaPorUnidadeOperacional(): void {
    this.viaturaService.listarviaturaPorUnidadeOperacional().subscribe({
      next: (dados: NomeTotalModel[]) => {
        this.graficoviaturaPorUnidadeOperacional.labels = [];
        this.graficoviaturaPorUnidadeOperacional.datasets = [];

        this.graficoviaturaPorUnidadeOperacional.labels = dados.map(dado => dado.nome);

        this.graficoviaturaPorUnidadeOperacional.datasets.push({
          label: 'Total de Viaturas por Unidade Operacional',
          data: dados.map(dado => dado.total),
          backgroundColor: 'rgba(255, 99, 132, 0.6)' 
        });

      },error: (error) => {
        console.error('Erro ao carregar dados do gráfico:', error); 
      }
    });
  }

  funcaoviaturaPorTipo(): void {
    this.viaturaService.listarviaturaPorTipo().subscribe({
      next: (dados: NomeTotalModel[]) => {
        this.graficoviaturaPorTipo.labels = [];
        this.graficoviaturaPorTipo.datasets = [];
        this.graficoviaturaPorTipo.labels = dados.map(dado => dado.nome);
        this.graficoviaturaPorTipo.datasets.push({
          label: 'Total de Viaturas por Tipo',
          data: dados.map(dado => dado.total),
          backgroundColor: 'rgba(192, 75, 143, 0.6)' 
        });
      },error: (error) => {
        console.error('Erro ao carregar dados do gráfico:', error); 
      }
    });
  }



    

  
  /*
  funcaograficoTipoCr(): void {
    this.viaturaService.listarPorviaturaTipoComandoRegional().subscribe({
      next: (dados: NomeTipoTotalModel[]) => {
        this.graficoAtualizado.labels = [];
        this.graficoAtualizado.datasets = [];

        const tipos = new Set(
          dados.flatMap(item => Object.keys(item.tipoTotal))
        );


        for (let dado of dados) {
          this.graficoAtualizado.labels.push(dado.nome);

        }

        for (let tipo of tipos) {
          const valores = dados.map(dado => dado.tipoTotal[tipo] ?? 0);

          this.graficoAtualizado.datasets.push({
            label: tipo,
            data: valores,
            backgroundColor: this.gerarCorAleatoria()
          });
        }

      },

      error: (error) => {
        console.error('Erro ao carregar dados do gráfico:', error);
      }
    });

  }*/

private gerarCorAleatoria(): string {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgba(${r}, ${g}, ${b}, 0.6)`;
}

private functionGrafico(dados: NomeTipoTotalModel[]): Map<string, number[]> {
  const mapaTipos: Map<string, number[]> = new Map();

   dados.map((dado, index) => {
          for (const tipo in dado.tipoTotal) {
            if (!mapaTipos.has(tipo)) {
              mapaTipos.set(tipo, Array(dados.length).fill(0));
            }
            mapaTipos.get(tipo)![index] = dado.tipoTotal[tipo];
          }

        });

        this.graficoAtualizadoVTR.labels = dados.map(dado => dado.nome);
        this.graficoAtualizadoVTR.datasets = [];
        for (const [tipo, valores] of mapaTipos) {
          this.graficoAtualizadoVTR.datasets.push({
            label: tipo,
            data: valores,
            backgroundColor: this.gerarCorAleatoria()
          });
        }

  return mapaTipos;
}


 
  public barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

}
