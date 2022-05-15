import { Article } from "./Article"

export class BonDeLivraisonMC{
  id !:number
  codeBonLivraisonMC!:string
  dateSystemeBLMC!:Date
  dateLivraisonBLMC!: Date
  listeMateriel!: Article[]

  constructor(){
      
  }


}