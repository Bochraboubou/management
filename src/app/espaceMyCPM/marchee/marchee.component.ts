import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BondeCommande } from 'src/app/model/BondeCommande';
import { Marchee } from 'src/app/model/Marchee';
import { Metier } from 'src/app/model/Metier';
import { Organisation } from 'src/app/model/Organisation';
import { Secteur } from 'src/app/model/Secteur';
import { BondeCommandeService } from 'src/app/service/bonde-commande.service';
import { EntrepriseServiceService } from 'src/app/service/entreprise-service.service';
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
  idOrgan:number=2;
  idSecteur!: number;
  marchee!: Marchee;
  entreprises:Organisation[]=[];
  idEntreprise!: number;
  idMarchee!: number;
  marchees:Marchee[]=[];
  showExistMarcheeAlert:boolean=false;
  successMarchee:boolean=false;
  bondesCommandes: BondeCommande[]=[];
  idEntrepriseBc!: number;
  entreprise!: Organisation;
  bc!: BondeCommande;
  secteurs!: Secteur[];
  idMetier!: number;
  codeEntreprise!: string;




  constructor(private organService:OrganisationServiceService,private secteurService:SecteurService,private metierService:MetierService,private marcheeService:MarcheeService,private entrepriseService:EntrepriseServiceService,private bondeCommandeService:BondeCommandeService) { }

  ngOnInit(): void {
    this.getOrganisation(this.idOrgan);
    this.onGetSecteurs();
   
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
  public getOrganisation(organId:number){
    this.organService.getOneOrganisation(organId).subscribe({
      next: (response:Organisation) => {
        this.organisation=response;
        console.log("organisation"+response);
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);
       },
      complete: () => console.info('complete') 
  })

  }

  
  //ajouter marchee
  public onAddMarchee(addMarcheeForm:NgForm,organId:number):void{
    //chercher lexistance du code avant l'ajout
    this.marcheeService.getMarcheebyCode(addMarcheeForm.value.code).subscribe({
      next: (response:Marchee) => {
        this.showExistMarcheeAlert=true;
        console.log("code existe deja");
      },
      error: (error:HttpErrorResponse) => {
        this.marcheeService.addMarchee(organId,this.idMetier,addMarcheeForm.value).subscribe({
          next: (response:Marchee) =>{
            this.marchee=response;
            this.idMarchee=this.marchee.id;
            console.log("marchee"+this.marchee);
            console.log("id marchee"+this.marchee.id);
            var x = document.getElementById("toast")
            x!.className = "show";
            setTimeout(function(){ x!.className = x!.className.replace("show", ""); }, 5000);
            this.successMarchee=true
            
        
    
            //récuperer les entreprises (organisations)
            this.organService.getOrganisationbyCode(this.codeEntreprise).subscribe({
              next: (response:Organisation) => {
                this.entreprise=response;
                console.log("entreprise ou organisation :  "+this.entreprise)
                
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
      complete: () => console.info('complete') 
  })
    

  }

  //recuperer la liste des marchees associee
  public onGetMarchees():void{
    this.marcheeService.getMarchees(this.idOrgan).subscribe({
      next: (response:Marchee[]) => {
        this.marchees=response;
        console.log("code du premier marchee"+this.marchees[1].code)
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);
       },
      complete: () => console.info('complete') 
  })
  }

  // ajouter une bonde commande
  public addBC(addBCForm:NgForm):void{
    document.getElementById('addBCModal')?.click();
    console.log(this.idEntrepriseBc);
   this.bondeCommandeService.addBondeCommande(this.idMarchee,this.idEntrepriseBc,addBCForm.value).subscribe({
      next: (response:BondeCommande) => {
        this.bc=response;
        this.bondesCommandes.push(this.bc);
        console.log("bonde commande"+response)

        //recuperer le nom de entrprise associee a la bonde commande
       /* this.entrepriseService.getEntreprisebyId(this.idEntrepriseBc).subscribe({
          next: (response:Entreprise) => {
            this.entrep=response;
            console.log("entereprise de bc"+response);
            
          },
          error: (error:HttpErrorResponse) => {
            alert(error.message);
           },
          complete: () => console.info('complete') 
      })*/
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);
       },
      complete: () => console.info('complete') 
  })

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

  //event
  getSecteur(secteurId:number){
    this.idSecteur=secteurId;
    console.log("idsecteur"+this.idSecteur);
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

  }

}
