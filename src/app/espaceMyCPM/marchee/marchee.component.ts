import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Marchee } from 'src/app/model/Marchee';
import { Metier } from 'src/app/model/Metier';
import { Organisation } from 'src/app/model/Organisation';
import { Secteur } from 'src/app/model/Secteur';
import { MarcheeService } from 'src/app/service/marchee.service';
import { MetierService } from 'src/app/service/metier.service';
import { OrganisationServiceService } from 'src/app/service/organisation-service.service';
import { SecteurService } from 'src/app/service/secteur.service';

@Component({
  selector: 'app-marchee',
  templateUrl: './marchee.component.html',
  styleUrls: ['./marchee.component.css']
})
export class MarcheeComponent implements OnInit {
  metiers!: Metier[];
  organisation!: Organisation;
  idOrgan:number=5;
  secteur!: Secteur;
  idSecteur!: number;
  nomSecteur!: string;
  marchee!: Marchee;


  constructor(private organService:OrganisationServiceService,private secteurService:SecteurService,private metierService:MetierService,private marcheeService:MarcheeService) { }

  ngOnInit(): void {
    this.getOrganisationandMetiers(this.idOrgan);
   // this.getSecteur(this.nomSecteur);
   // this.getMetiers(this.idSecteur);
    
    
    console.log("heye hey heeey");
    console.log("hello");
  }
  public onOpenBCModal():void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    button.setAttribute('data-target','#addBCModal');
    container?.appendChild(button);
    button.click();
    

  }

  //récuperer l'organisation ,le secteur d'activité et la liste des metiers relatives
  public getOrganisationandMetiers(organId:number){
    this.organService.getOneOrganisation(organId).subscribe({
      next: (response:Organisation) => {
        this.organisation=response;
        this.nomSecteur=this.organisation.secteur_d_activite;
        console.log(response);
        console.log(this.nomSecteur);

         //récuperer le secteur par nom
         this.secteurService.getSecteurbyNom(this.nomSecteur).subscribe({
          next: (response:Secteur) => {
            this.secteur=response;
            this.idSecteur=this.secteur.id;
            console.log(response);
            console.log(this.secteur.nomSecteur);

            //récuperer les metiers par secteurs
            this.metierService.getMetiersBySecteur(this.idSecteur).subscribe({
              next: (response:Metier[]) =>{
                this.metiers=response;
                console.log(response);
                
              },
              error: (error:HttpErrorResponse) => {
                alert(error.message);
               },
              complete: () => console.info('complete') 
          })
            
            
            
          },
          error: (error:HttpErrorResponse) => {
            alert(error.message);
           },
          complete: () => console.info('complete') 
      })
        
        
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);
       },
      complete: () => console.info('complete') 
  })

  }

  
  //ajouter marchee
  public onAddMarchee(addMarcheeForm:NgForm,organId:number):void{
    this.marcheeService.addMarchee(organId,addMarcheeForm.value).subscribe({
      next: (response:Marchee) =>{
        this.marchee=response;
        console.log(response);
        
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);
       },
      complete: () => console.info('complete') 
  })


  }

}
