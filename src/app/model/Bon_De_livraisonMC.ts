import { Article } from "./Article"

export class BonDeLivraisonMC{
  id !:number
  codeBonLivraisonMC!:string
  dateSystemeBLMC!:Date
  dateLivraisonBLMC!: Date
  montantBL!:number
  listeMateriel!: Article[]

  constructor(){
      
  }


}