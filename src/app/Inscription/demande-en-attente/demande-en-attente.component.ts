import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Demande } from 'src/app/model/Demande';
import { DemandeService } from 'src/app/service/demande.service';

@Component({
  selector: 'app-demande-en-attente',
  templateUrl: './demande-en-attente.component.html',
  styleUrls: ['./demande-en-attente.component.css']
})
export class DemandeEnAttenteComponent implements OnInit {
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
  sppalerte=0;
  langueur!:number
  enAttenteListe:Demande[]=[]
  
 
  constructor(public _servicedemande:DemandeService,
     private router:Router) { }

  ngOnInit(): void {
    
    this.getListDemandeAttente();
   //console.log("")
   
  }


  public onOpenDeleteModal(id:number):void{
    this._servicedemande.getDemandeById(id).subscribe({
      next: (response:Demande) => {
        this.demande=response;
        const container=document.getElementById('main-container');
        const button=document.createElement('button');
        button.type='button';
        button.style.display='none';
        button.setAttribute('data-toggle','modal');
        button.setAttribute('data-target','#delete');
        container?.appendChild(button);
        button.click();
        
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);
       },
      complete: () => console.info('complete') 
     
    })
  
  }
  supprimer(id:number){
   
    this._servicedemande.deleteDemande(id).subscribe({
       next: (response:void) => {
       console.log("suuuuup")
         this.sppalerte=1


         this.enAttenteListe.forEach((currDemande) => {
          if(currDemande.id ==id) {
           let index= this.enAttenteListe.findIndex(currDemande=>
            currDemande.id==id)
        console.log(index)
        this.enAttenteListe.splice(index,1);
       // this.alertSuppression=1
      // alert("c'est bien c'est supprimer de la liset")
          }
          
        }
        );
        
       },
       error: (error:HttpErrorResponse) => {
        
         alert("echec de suppression ")
        },
       complete: () => console.info('complete') 
      
     })
     
   
   }
  











  public getListDemandeAttente():void
  {

    this._servicedemande.DemandesEnAttente().subscribe(
      (response:Demande[])=>{
        this.enAttenteListe=response
        this.totalLength=response.length;
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
       }
    )
  
      }


      /************************************************** */

     
    
     
    
    
      public onDeleteDemande(demandeId:number): void {
        this._servicedemande.deleteDemande(demandeId).subscribe(
          (response: void) => {
            console.log(response);
            this.getListDemandeAttente();
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
          this.getListDemandeAttente();
        }
      }
      /***************************************** */
    
      public onOpenModal(demande:Demande, mode: string): void {
          const container = document.getElementById('main-container');
          const button = document.createElement('button');
          button.type = 'button';
          button.style.display = 'none';
          button.setAttribute('data-toggle', 'modal');
          
          if (mode === 'supprimerTous') {
           // this.deleteDDemande = demande;
            button.setAttribute('data-target', '#deleteAllDemandeModal');
          }
         container?.appendChild(button);
          button.click();
        }




        DeleteDemande(id:number){
          //alert("vous etes sure de supprimer le demande num "+id+"?");
          this._servicedemande.deleteDemande(id).subscribe(
            (response: void) => {
              console.log(response);
              console.log("deleted");
              this.getListDemandeAttente();
            
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

        onOpenDeleteOneDemandeModal(id:number):void{
          this._servicedemande.getDemandeById(id).subscribe({
            next: (response:Demande) => {
          const container = document.getElementById('main-container');
          const button = document.createElement('button');
          button.type = 'button';
          button.style.display = 'none';
          button.setAttribute('data-toggle', 'modal');
          button.setAttribute('data-target', '#supprimerDemande');
          container?.appendChild(button);
          button.click();
        
          
    },
    error: (error:HttpErrorResponse) => {
      alert(error.message);
     },
    complete: () => console.info('complete') 
   
  })
}
closeAlerte(){
  this.sppalerte=0
}
}

