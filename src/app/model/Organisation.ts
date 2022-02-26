import { Entreprise } from "./Entreprise";

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
    nomAdmin:String;
    telAdmin:number;
    emailAdmin:string;
    listentreprises:Array<Entreprise>;
}