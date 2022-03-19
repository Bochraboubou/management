
import { Marchee } from "./Marchee";
import { User } from "./User";

export class Organisation{
    id!: number;
    nom!:string;
    code!:string
    secteur_d_activite!:string;
    email!: string;
    pays!:string;
    region!:string;
    adresse!: string;
    tel!: number;
    type!:string;
    nomDG!:string;
    telDG!:number;
    emailDG!:string;
    users!:Array<User>;
    listmarchees!:Array<Marchee>;
    constructor(){}
}