export interface ObjectStatusTotalModel {
    nome: string;
    total:{
            [status: string]: number
        };
  
}
