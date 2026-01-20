export interface NomeTipoTotalModel {
    nome: string;
    tipoTotal: { 
        [tipo: string]: number 
    };
}
