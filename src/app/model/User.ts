import { Role } from "./Role";
 export class User {
    id!: number;
    name!:string;
    email!:string;
    password!: string;
    username!: string;
    codeConfirmation!: string;
    roles!:Role[];
     role!:string;
    constructor( ){}
    }