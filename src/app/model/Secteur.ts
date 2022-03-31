import { Metier } from "./Metier";

export class Secteur{
    id!: number;
    nomSecteur!: string;
    metiers:Metier[]=[];
}