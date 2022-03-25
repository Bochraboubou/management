import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Metier } from 'src/app/model/Metier';
import { Secteur } from 'src/app/model/Secteur';
import { SecteurService } from 'src/app/service/secteur.service';

@Component({
  selector: 'app-articlespecifiee',
  templateUrl: './articlespecifiee.component.html',
  styleUrls: ['./articlespecifiee.component.css']
})
export class ArticlespecifieeComponent implements OnInit {
  secteurs!: Secteur[];
  metiers!: Metier[];
  chosenSecteur!: Secteur;

 
  constructor(private secteurService:SecteurService) {}

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

  //event lors du choix du metier
  getMetiers(secteurId:number){
    console.log(secteurId);

  }


}
