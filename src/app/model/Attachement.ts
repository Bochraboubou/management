import { Article } from "./Article";
import { ArticleRealiseeId } from "./ArticleRealiseeId";

export class Attachement{
    id!: number;
    codeAttachement!: string;
    dateAttachement!: Date;
    listeArticles:Article[]=[];
    listeArticlesRealisee!:ArticleRealiseeId

    BCid!:number;
    constructor(){}
    
}