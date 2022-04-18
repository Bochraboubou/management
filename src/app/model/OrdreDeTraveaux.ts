import { Article } from "./Article";
import { OrdreDefinitif } from "./OrdreDefinitif";

export class OrdreDeTraveaux{
    id!: number;
    codeOrdre!: string;
    //datesysteme
    dateOrdre!: Date;
    dateDebutOrdre!: Date;
    delais!: number;
    montant:number | undefined;
    listeArticles:Article[]=[];
    listOrdreDefinitif:OrdreDefinitif[]=[];

    
    constructor(){}
    



    
}