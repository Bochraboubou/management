import { Article } from "./Article"

export class BonDeLivraisonMC{
  id !:number
  codeBonLivraisonMC!:string
  dateSystemeBLMC!:Date
  dateLivraisonBLMC!: Date
  montant!: number
  montantBL!:number
  listeMateriel!: Article[]

  constructor(){
      
  }


}