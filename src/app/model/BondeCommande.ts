import { Article } from "./Article";
import { ArticleUtilisee } from "./ArticleUtilisee";

export class BondeCommande{
    id!: number;
    codebc!: string;
    montant!: number;
    delais!: number;
    idEntrep!: number;
    nomEntrep!: string;
    valide:boolean=false;
    listeArticles:Article[]=[];

    constructor(){}
    
}