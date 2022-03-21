import { BondeCommande } from "./BondeCommande";

export class Marchee{
    id!: number;
    code!: string;
    designiation!: string;
    budget!: string;
    type!: string;
    montant!: number;
    unitee:string | undefined;
    delais!: number;
    listeBondeCommandes:BondeCommande[]=[];

    constructor(){}
}