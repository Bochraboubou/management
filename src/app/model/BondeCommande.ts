import { ArticleUtilisee } from "./ArticleUtilisee";

export interface BondeCommande{
    id:number;
    numeros:number;
    montant:number;
    delais:number;
    listeArticlesUtilisees:Array<ArticleUtilisee>;
}