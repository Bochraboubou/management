import { Role } from "./Role";
 export class User {
    id!: number;
    name!:string;
    email!: String;
    password!: string;
    username!: string;
    code!: number;
    roles!:Array<Role>;
     

     
    constructor( ){}
    }