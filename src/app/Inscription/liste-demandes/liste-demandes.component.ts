import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Demande } from 'src/app/model/Demande';
import { DemandeService } from 'src/app/service/demande.service';

@Component({
  selector: 'app-liste-demandes',
  templateUrl: './liste-demandes.component.html',
  styleUrls: ['./liste-demandes.component.css']
})
export class ListeDemandesComponent implements OnInit {
  demandes!:Demande[];
  constructor(private _servicedemande:DemandeService) { }

  ngOnInit(): void {
 
    this.getListeDesDemandes();
  }
  public getListeDesDemandes():void
  {
    this. _servicedemande.getDemandes().subscribe(
      (response:Demande[])=>{
        this.demandes=response;
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
       }
    )
      }
}
