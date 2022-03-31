import { ArticleUtilisee } from "./ArticleUtilisee";

export class Article{
    id!: number;
    code!: string;
    designation!: string;
    unitee!: string;
    prix!: number;
    quantitee!: number;
    idType!: number;
    typeLib!: string;
    bcassociation:ArticleUtilisee[]=[];
    constructor(){
        
    }

}
