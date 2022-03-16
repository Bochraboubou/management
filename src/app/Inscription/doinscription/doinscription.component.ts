import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Demande } from 'src/app/model/Demande';
import { Secteur } from 'src/app/model/Secteur';
import { DemandeService } from 'src/app/service/demande.service';
import { SecteurService } from 'src/app/service/secteur.service';

@Component({
  selector: 'app-doinscription',
  templateUrl: './doinscription.component.html',
  styleUrls: ['./doinscription.component.css']
})
export class DoinscriptionComponent implements OnInit {
demande=new Demande();
demandes !:Demande[];
secteurs!:Secteur[]
  constructor( private _servicedemande:DemandeService, private secteurService:SecteurService) { }

  ngOnInit(): void {
    this.getSecteurs();
  }
  public onAddDemande(addForm: NgForm): void {
    // document.getElementById('add-employee-form').click();
     this._servicedemande.addDemande(addForm.value).subscribe(
       (response: Demande) => {
         console.log(response);
         console.log("accepteeeee");
        addForm.reset();
       },
       (error: HttpErrorResponse) => {
         alert(error.message);
         console.log("erreur");
         //addForm.reset();
       }
     );
   
}
//récuperer la liste des secteurs d'activités
public getSecteurs():void
{
  this.secteurService.getSecteurs().subscribe(
    (response:Secteur[])=>{
      this.secteurs=response;
    },
    (error:HttpErrorResponse)=>{
      alert(error.message);
     }
  );
    }
}
