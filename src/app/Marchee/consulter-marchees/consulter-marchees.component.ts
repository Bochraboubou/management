import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BondeCommande } from 'src/app/model/BondeCommande';
import { Marchee } from 'src/app/model/Marchee';
import { Metier } from 'src/app/model/Metier';
import { Organisation } from 'src/app/model/Organisation';
import { Secteur } from 'src/app/model/Secteur';
import { Type } from 'src/app/model/Type';
import { BondeCommandeService } from 'src/app/service/bonde-commande.service';
import { MarcheeService } from 'src/app/service/marchee.service';
import { MetierService } from 'src/app/service/metier.service';
import { OrganisationServiceService } from 'src/app/service/organisation-service.service';
import { SecteurService } from 'src/app/service/secteur.service';
import { TypeService } from 'src/app/service/type.service';

@Component({
  selector: 'app-consulter-marchees',
  templateUrl: './consulter-marchees.component.html',
  styleUrls: ['./consulter-marchees.component.css']
})
export class ConsulterMarcheesComponent implements OnInit {

  idOrgan:number=2;
  secteurs!: Secteur[];
  metiers!: Metier[];
  marchees!: Marchee[];
 

  secteurC!: Secteur;
  metierC!: Metier;

  searchM:any;

  MarcheestotalLength:any;
  Mpage:number = 1;
  Bpage:number = 1;
  

  
  chosenSecteur!: Secteur;

 
  constructor(private secteurService:SecteurService,private metierService:MetierService,private typeService:TypeService,private marcheeService:MarcheeService,private bonDeCommandeService :BondeCommandeService,private organisationService:OrganisationServiceService) {}

  ngOnInit(): void {
    this.onGetSecteurs();
  }

   //Collapse pour l'affichage des bonsDeCommandes
   public onOpenBCCollapse(i:number):void{
     const container=document.getElementById('main-container');
     const button=document.createElement('button');
     button.type='button';
     button.style.display='none';
     button.setAttribute('data-toggle','collapse');
     button.setAttribute('data-target','#bCommande'+i);
     container?.appendChild(button);
     button.click();
 
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
 
    

  }
   //event lors du choix du metier
   getMetierChoisis(metierId:number){
    console.log("id du metier choisis"+metierId);
    this.onGetMetierById(metierId);
    this.getMarchees(metierId);
    
    

    

  }



   //récuperer le secteur choisis
   public onGetSecteurById(idSecteur:number):void{
    this.secteurService.getSecteurbyId(idSecteur).subscribe({
      next: (response:Secteur) => {
        this.secteurC=response;
        console.log(" nom du desecteur choisis :   "+this.secteurC.nomSecteur+"  id u secteur choisis :   "+this.secteurC.id);
       
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);

       },
      complete: () => console.info('complete') 
  })
  }

   //récuperer le metier choisis
   public onGetMetierById(idMetier:number):void{
    this.metierService.getMetierbyId(idMetier).subscribe({
      next: (response:Metier) => {
        this.metierC=response;
        console.log(" nom du de metier choisis :   "+this.metierC.nomMetier+"  id du metier choisis :   "+this.metierC.id);
       
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);

       },
      complete: () => console.info('complete') 
  })
  }

  
   //récuperer l'entreprise par Bon de Commande
   public onGetEntrepoByBC(bonDeCommande:BondeCommande):void{
    this.organisationService.getOrganisationbyBonDeCommande(bonDeCommande.id).subscribe({
      next: (response:Organisation) => {
        bonDeCommande.nomEntreprise=response.nom;
        console.log(" nom d'entreprise cherché :   "+bonDeCommande.nomEntreprise);
       
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);

       },
      complete: () => console.info('get entreprise complete') 
  })
  }




  //recuperer les metiers liés au secteur choisis
  public getMetiers(idSecteur:number):void{
     //récuperer les metiers par secteurs
     this.metierService.getMetiersBySecteur(idSecteur).subscribe({
      next: (response:Metier[]) =>{
        this.metiers=response;
        console.log("metiers du du secteur de id "+this.secteurC?.id+" sont les suivants"+response);
        
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);

       },
      complete: () => console.info('complete') 
  })  

  }

   //récuperer la liste des marchees par organisation et metier
  public getMarchees(idMetier:number):void{
    this.marcheeService.getMarcheesbyMetierandOrganisation(idMetier,this.idOrgan).subscribe({
      next: (response:Marchee[]) => {
      this.marchees=response;
      for (let i = 0; i < this.marchees.length; i++) {
        for (let j = 0; j < this.marchees[i]?.bondes.length; i++) {
          this.onGetEntrepoByBC(this.marchees[i].bondes[j]);
        }
        
        //this.getBonsDeCommandes(this.marchees[i]);
      }
        console.log("marchees par metiers et organ"+this.marchees);
        this.MarcheestotalLength=this.marchees.length;
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);

       },
      complete: () => console.info('getMarchees complete') 
  })
  }

   //récuperer la liste des bonsDeCommandes par marchee
   public getBonsDeCommandes(marchee:Marchee):void{
    this.bonDeCommandeService.getBCsByMarchee(marchee.id).subscribe({
      next: (response:BondeCommande[]) => {
        marchee.bondes=response;
        for (let i = 0; i < marchee.bondes.length; i++) {
          this.onGetEntrepoByBC(marchee.bondes[i]);
        }
      
        console.log("code premiere bc du marchee"+marchee.bondes[1]?.codebc);
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);

       },
      complete: () => console.info('get bcs complete') 
  })
  }
  
  


}
