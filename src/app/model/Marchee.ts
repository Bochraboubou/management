import { BondeCommande } from "./BondeCommande";

export class Marchee{
    id!: number;
    code!: string;
    designiation!: string;
    budget!: string;
    type!: string;
    montant!: number;
    delais!: number;
    listeBondeCommandes:BondeCommande[]=[];

    constructor(){}
}