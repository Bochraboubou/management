import { Article } from "./Article";

export interface Type{
    id:number;
    typeLib:string;
    listeArticles:Article[];
}