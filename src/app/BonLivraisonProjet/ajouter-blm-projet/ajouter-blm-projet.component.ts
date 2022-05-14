import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BondeCommande } from 'src/app/model/BondeCommande';
import { Metier } from 'src/app/model/Metier';
import { BondeCommandeService } from 'src/app/service/bonde-commande.service';
import { MetierService } from 'src/app/service/metier.service';

@Component({
  selector: 'app-ajouter-blm-projet',
  templateUrl: './ajouter-blm-projet.component.html',
  styleUrls: ['./ajouter-blm-projet.component.css']
})
export class AjouterBlmProjetComponent implements OnInit {
bondeCommande!:BondeCommande
metier!:Metier
  constructor( private bonCommandeService:BondeCommandeService,  private metierService:MetierService) { }

  ngOnInit(): void {
    let Bc_id=1
    let met_id=1
    this.getBonDeCommande(Bc_id);
    this.getMetier(met_id)
  

  }


  getBonDeCommande(id:number){
    this.bonCommandeService.getBCbyId(id).subscribe({
     
      next: (response:BondeCommande) => {
         this.bondeCommande=response
     },
      error: (error:HttpErrorResponse) => {
        console.log(error.message);
     
       },
      complete: () => console.info('complete') 
    })

  }
  getMetier(id:number){
    this.metierService.getMetierbyId(id).subscribe({
     
      next: (response:Metier) => {
         this.metier=response
     },
      error: (error:HttpErrorResponse) => {
        console.log(error.message);
     
       },
      complete: () => console.info('complete') 
    })

  }
  closeAlerts(){
    
  }
}
