import { Organisation } from "./Organisation";
import { Role } from "./Role";
 export class User {
    id!: number;
    name!:string;
    email!:string;
    password!: string;
    username!: string;
    codeConfirmation!: string;
    roles:Role[]=[];
     role!:string;
     active!:boolean;
     adresse!:string
     tel!:number
     datenaissance!:Date
     organisation!:Organisation;
    image!:string;
    code!:string
    constructor( ){}
    }