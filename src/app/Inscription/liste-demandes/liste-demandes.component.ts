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
  sppalerte=0
  ListeApprouvee:Demande[]=[]
  
 
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
        this.demandes.forEach((curDemande) => {
          if (curDemande.demandeStatus==true){
            console.log("ouii")
           this. ListeApprouvee.push(curDemande)
          } else{
            console.log("nnnnnnnnnn")
          }
      
        })
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
       }
    )
      }


      /************************************************** */

     
    
   
      
   
    
     
    
    
      public onOpenModal(demande:Demande, mode: string): void {
        const container = document.getElementById('main-container');
        const button = document.createElement('button');
        button.type = 'button';
        button.style.display = 'none';
        button.setAttribute('data-toggle', 'modal');
        
        if (mode === 'supprimerTous') {
         // this.deleteDDemande = demande;
          button.setAttribute('data-target', '#deleteAllEmployeeModal');
        }
       container?.appendChild(button);
        button.click();
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
    
     this.ListeApprouvee.forEach((currDemande) => {
      if(currDemande.id ==id) {
       let index= this.ListeApprouvee.findIndex(currDemande=>
        currDemande.id==id)
    console.log(index)
    this.ListeApprouvee.splice(index,1);
  }
          
}
);
       this.sppalerte=1
      
     },
     error: (error:HttpErrorResponse) => {
      
       alert("echec de suppression ")
      },
     complete: () => console.info('complete') 
    
   })
   
 
 }



 onAfficheDetail(id:number){
  this.router.navigate(['DemandeDetail',id])
}
}
