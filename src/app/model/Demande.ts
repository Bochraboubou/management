export class Demande {
     id!:number;
     nom!:string;
     code!:string;
     secteur_d_activite!:string;
      email!:string;
      pays!:string;
       region!:string;
       adresse!:string ;
       telOrg!:number;
     type!:string;
      nomDG!:string;
      telDG!:number;
      emailDG!:string;
    nomAdmin!:string ;
     telAdmin!:number;
     emailAdmin!:string ;
     logopath!:string;
     documentpath!:string;
     demandeStatus:boolean=true;
     filename!:string
     constructor(){
         
     }
}
    