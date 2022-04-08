import { Article } from "./Article";

export class Attachement{
    id!: number;
    codeAttachement!: string;
    dateAttachement!: Date;
    listeArticles:Article[]=[];

    constructor(){}
    
}