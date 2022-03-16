import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Demande } from 'src/app/model/Demande';
import { DemandeService } from 'src/app/service/demande.service';

@Component({
  selector: 'app-liste-demandes',
  templateUrl: './liste-demandes.component.html',
  styleUrls: ['./liste-demandes.component.css']
})
export class ListeDemandesComponent implements OnInit {
  demandes!:Demande[];
  sendDemande!:Demande;
  deleteDDemande!:Demande;
  editDemande!: Demande;
  nb!:number;
v = Math.random()*(100 - 50) + 50;
  constructor(private _servicedemande:DemandeService, private route :ActivatedRoute) { }

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


      /************************************************** */

     
    
      public onAddDemande(addForm: NgForm): void {
       // document.getElementById('add-employee-form').click();
        this._servicedemande.addDemande(addForm.value).subscribe(
          (response: Demande) => {
            console.log(response);
            this.getListeDesDemandes();
            addForm.reset();
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
            addForm.reset();
          }
        );
      }
    
      public onUpdateEmloyee(demande: Demande): void {
        this._servicedemande.updateDemande(demande).subscribe(
          (response: Demande) => {
            console.log(response);
            this.getListeDesDemandes();
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }
    
      public onDeleteDemande(demandeId:number): void {
        this._servicedemande.deleteDemande(demandeId).subscribe(
          (response: void) => {
            console.log(response);
            this.getListeDesDemandes();
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }
    
      public searchEmployees(key: string): void {
        console.log(key);
        const results: Demande[] = [];
        for (const d of this.demandes) {
          if (d.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || d.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || d.nomDG.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || d.adresse.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
            
           results.push(d);
            
          }
        }
    this.demandes = results;
        if (results.length === 0 || !key) {
          this.getListeDesDemandes();
        }
      }
      /***************************************** */
    
      public onOpenModal(demande:Demande, mode: string): void {
          const container = document.getElementById('main-container');
          const button = document.createElement('button');
          button.type = 'button';
          button.style.display = 'none';
          button.setAttribute('data-toggle', 'modal');
          if (mode === 'send') {
             this.sendDemande = demande;
            button.setAttribute('data-target', '#SendDemandeModal');
          }
          if (mode === 'edit') {
            this.editDemande = demande;
            button.setAttribute('data-target', '#updateDemandeModal');
          }
          if (mode === 'delete') {
            this.deleteDDemande = demande;
            button.setAttribute('data-target', '#deleteDemandeModal');
          }
         container?.appendChild(button);
          button.click();
        }
       

      
}
