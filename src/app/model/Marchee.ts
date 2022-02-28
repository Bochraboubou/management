import { BondeCommande } from "./BondeCommande";

export interface Marchee{
    id:number;
    secteurd_activitee:string;
    metier:string;
    code:string;
    designation:string;
    budget:string;
    type:string;
    montant:number;
    delais:number;
    listeBondeCommandes:Array<BondeCommande>;
}