import { Article } from "./Article";
import { OrdreDefinitif } from "./OrdreDefinitif";

export class OrdreDeTraveaux{
    id!: number;
    codeOrdre!: string;
    dateOrdre!: Date;
    dateDebutOrdre!: Date;
    delais!: number;
    montant!: number;
    listeArticles:Article[]=[];
    listOrdreDefinitif:OrdreDefinitif[]=[];

    
    constructor(){}
    



    
}