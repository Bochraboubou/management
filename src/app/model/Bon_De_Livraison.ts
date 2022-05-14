import { Article } from "./Article"

export class BonDeLivraisonProjet{
    bl_id !:number
   codeBonLivraisonProj!:string
   dateSystemeBLProj!:Date
   dateLivraisonBLProj!:Date
   listeMateriel!: Article[]

   constructor(){
       
   }

}