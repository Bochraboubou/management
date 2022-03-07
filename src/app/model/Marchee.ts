import { BondeCommande } from "./BondeCommande";

export interface Marchee{
    id:number;
    code:string;
    designiation:string;
    budget:string;
    type:string;
    montant:number;
    delais:number;
    listeBondeCommandes:Array<BondeCommande>;
}