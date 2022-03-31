import { Type } from "./Type";

export class Metier{
    id!: number;
    nomMetier!: string;
    types:Type[]=[];
    constructor(){ 
    }
}
