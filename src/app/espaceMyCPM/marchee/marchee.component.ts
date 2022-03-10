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
  bondeCommande!: BondeCommande;
  secteurs!: Secteur[];
  idMetier!: number;
  alerteCodeInexistant:boolean=false;
  codeEntreprise!: string;
  idEntreprises:Array<number>=[];
  nomEntreprises:Array<string>=[];
  newMarchee: Marchee= new Marchee();
  indiceBC!: number;
  montantArticle:number= 0;
 
  
 
 
  




  constructor(private organService:OrganisationServiceService,private secteurService:SecteurService,private metierService:MetierService,private marcheeService:MarcheeService,private entrepriseService:EntrepriseServiceService,private bondeCommandeService:BondeCommandeService) { }

  ngOnInit(): void {
    this.getOrganisation(this.idOrgan);
    this.onGetSecteurs();
   
   
   
    console.log("heye hey heeey");
    console.log("hello");
  }

  //modal pour l'ajout dune bonde commande
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

  //Modal pur le choix des articles dans la BC
  public onOpenArticlesModal(indicedeBC:number):void{
   const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    this.indiceBC=indicedeBC;
    button.setAttribute('data-target','#articleModal');
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
            this.successMarchee=true;
            
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


  // ajouter une bonde commande
  public addBC(addBCForm:NgForm):void{
    console.log("codeEntreprise"+this.codeEntreprise)
    this.organService.getOrganisationbyCode(this.codeEntreprise).subscribe({
      next: (response:Organisation) => {
        document.getElementById('addBCModal')?.click();
        this.entreprise=response;
        this.idEntrepriseBc=this.entreprise.id;
        console.log("entreprise ou organisation :  "+this.entreprise);
        console.log("id de l'entreprise :  "+this.idEntrepriseBc);
        let bc:BondeCommande = addBCForm.value;
        bc.idEntrep=this.entreprise.id;
        bc.nomEntrep=this.entreprise.nom;
        bc.numeros= 1+ this.newMarchee.listeBondeCommandes.length;
        this.newMarchee.listeBondeCommandes.push(bc);
        console.log("longeurrrr   "+this.newMarchee.listeBondeCommandes.length);
        addBCForm.reset();
      
       
        
        

        //valider les informations de la bonde commande
       /* document.getElementById('addBCModal')?.click();
        console.log(this.idEntrepriseBc);
         this.bondeCommandeService.addBondeCommande(11,bc.idEntrep,bc).subscribe({
          next: (response:BondeCommande) => {
            console.log("bonde commande"+response)
          },
          error: (error:HttpErrorResponse) => {
            alert(error.message);
           },
          complete: () => console.info('complete') 
          
      })
      */
      
  

        
      },
      error: (error:HttpErrorResponse) => {
        this.alerteCodeInexistant=true;
        
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

  //evenement lors du choix d'un secteur
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
