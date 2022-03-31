import { Article } from "./Article";
import { ArticleUtilisee } from "./ArticleUtilisee";
import { Organisation } from "./Organisation";

export class BondeCommande{
    id!: number;
    codebc!: string;
    montant!: number;
    delais!: number;
    valide:boolean=false;
    listeArticles:Article[]=[];
    entreprise!: Organisation;
    idEntrep!: number;
    nomEntreprise!: string;
    articlesassociation:ArticleUtilisee[]=[];

    constructor(){}
    
}