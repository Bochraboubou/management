import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Demande } from 'src/app/model/Demande';
import { Organisation } from 'src/app/model/Organisation';
import { DemandeService } from 'src/app/service/demande.service';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {
  editDemande!:Demande;
  deleteDemande!:Demande;
demandes !:Demande [];
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
    );

  }
  public onOpenModal(demande:Demande, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editDemande =demande;
      button.setAttribute('data-target', '#updateDemandeeModal');
    }
    if (mode === 'delete') {
      this.deleteDemande = demande;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
