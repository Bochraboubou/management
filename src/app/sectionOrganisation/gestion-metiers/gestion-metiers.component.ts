import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Metier } from 'src/app/model/Metier';
import { Secteur } from 'src/app/model/Secteur';
import { MetierService } from 'src/app/service/metier.service';
import { SecteurService } from 'src/app/service/secteur.service';

@Component({
  selector: 'app-gestion-metiers',
  templateUrl: './gestion-metiers.component.html',
  styleUrls: ['./gestion-metiers.component.css']
})
export class GestionMetiersComponent implements OnInit {
  secteurs!: Secteur[];
  metiers!: Metier[];
  secteur!: Secteur;
  searchM:any;
  affich:boolean = false;

  
  chosenSecteur!: Secteur;

 
  constructor(private secteurService:SecteurService,private metierService:MetierService) {}

  ngOnInit(): void {
    this.onGetSecteurs();
  }

  //récuperer la liste des secteurs
  public onGetSecteurs():void{
    this.secteurService.getSecteurs().subscribe({
      next: (response:Secteur[]) => {
        this.secteurs=response;
        console.log("secteurs"+this.secteurs)
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);

       },
      complete: () => console.info('complete') 
  })
  }

  //event lors du choix du secteur
  getSecteurChoisis(secteurId:number){
    console.log("id du secteur choisis"+secteurId);
    this.onGetSecteurById(secteurId);
    this.getMetiers(secteurId);
    this.affich=true;

    

  }

   //récuperer le secteur choisis
   public onGetSecteurById(idSecteur:number):void{
    this.secteurService.getSecteurbyId(idSecteur).subscribe({
      next: (response:Secteur) => {
        this.secteur=response;
        console.log(" nom du desecteur choisis :   "+this.secteur.nomSecteur+"  id u secteur choisis :   "+this.secteur.id);
       
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);

       },
      complete: () => console.info('complete') 
  })
  }

  //recuperer les metiers liés au secteur choisis
  public getMetiers(idSecteur:number):void{
     //récuperer les metiers par secteurs
     this.metierService.getMetiersBySecteur(idSecteur).subscribe({
      next: (response:Metier[]) =>{
        this.metiers=response;
        console.log("metiers du du secteur de id "+this.secteur.id+" sont les suivants"+response);
        
      },
      error: (error:HttpErrorResponse) => {
        console.log("secteur not found or secteur non specifiée")
       },
      complete: () => console.info('complete') 
  })  

  }


}