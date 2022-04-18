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
   active!:boolean;
   adresse!:string
   tel!:number
   datenaissance!:Date
   organisation!:Organisation;
    image!:string;
    code!:string
    nomRole!:string;
    constructor( ){}
    }