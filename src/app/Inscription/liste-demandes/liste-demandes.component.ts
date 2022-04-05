import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  infoDemande!:Demande;
  nb!:number;
  demande!:Demande;
  taille!:number;
  terme:any;
  page:number = 1;
  totalLength:any;
  
 
  constructor(public _servicedemande:DemandeService, private router:Router) { }

  ngOnInit(): void {
    
    this.getListeDesDemandes();
   //console.log("")
   
  }
  public getListeDesDemandes():void
  {
   
    this. _servicedemande.getDemandes().subscribe(
      (response:Demande[])=>{
        this.demandes=response;
        this.totalLength=response.length;
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
      
    //on commentaire car j ai changé la methode updata
     /* public onUpdateEmloyee(demande: Demande): void {
        this._servicedemande.updateDemande(demande).subscribe(
          (response: Demande) => {
            console.log(response);
            this.getListeDesDemandes();
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }*/
    
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




        DeleteDemande(id:number){
          alert("vous etes sure de supprimer le demande num "+id+"?");
          this._servicedemande.deleteDemande(id).subscribe(
            (response: void) => {
              console.log(response);
              console.log("deleted");
              this.getListeDesDemandes();
            
            },
            (error: HttpErrorResponse) => {
              alert(error.message);

            }
          );
        
        }
       
        onAfficheDetail(id:number){
           this.router.navigate(['DemandeDetail',id])
        }
        trueDemande(id:number){
          this.demande.demandeStatus=true;
        }
}
