import { Role } from "./Role";
 export class User {
    id!: number;
    name!:string;
    email!: String;
    password!: string;
    username!: string;
     code_org!: string;
     roles!:Array<Role>;
     

     
    constructor( ){}
    }