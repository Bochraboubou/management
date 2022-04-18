import { Article } from "./Article";
import { OrdreDefinitif } from "./OrdreDefinitif";

export class OrdreDeTraveaux{
    id!: number;
    codeOrdre!: string;
    dateOrdre!: Date;
    montant:number | undefined;
    listeArticles:Article[]=[];
    listOrdreDefinitif:OrdreDefinitif[]=[];

    
    constructor(){}
    



    
}