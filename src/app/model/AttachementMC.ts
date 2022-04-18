import { Article } from "./Article";
import { ArticleRealiseeMC } from "./ArticleRealiseeMC";

export class AttachementMC{
    id!: number;
    codeAttachementMC!: string;
    dateAttachementMC!: Date;
    listeArticles:Article[]=[];
    listeArticlesRealiseeMC: ArticleRealiseeMC[]=[];
    
    constructor(){}
    



    
}