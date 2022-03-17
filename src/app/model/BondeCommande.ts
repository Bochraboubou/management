import { Article } from "./Article";
import { ArticleUtilisee } from "./ArticleUtilisee";

export class BondeCommande{
    id!: number;
    numeros!: number;
    montant!: number;
    delais!: number;
    valide:boolean=false;
    listeArticles:Article[]=[];
    idEntrep!: number;
    nomEntrep!: string;

    constructor(){}
    
}