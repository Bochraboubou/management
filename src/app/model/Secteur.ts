import { Metier } from "./Metier";

export interface Secteur{
    id:number;
    nomSecteur:string;
    listeMetiers:Array<Metier>;
}