
import { Marchee } from "./Marchee";

export interface Organisation{
    id: number;
    nom:string;
    code:string
    secteur_d_activite:string;
    email: string;
    pays:string;
    region:string;
    adresse: string;
    tel: number;
    type:string;
    nomDG:string;
    telDG:number;
    emailDG:string;
    listmarchees:Array<Marchee>;
}