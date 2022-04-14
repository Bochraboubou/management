import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/model/Article';
import { BondeCommande } from 'src/app/model/BondeCommande';
import { Marchee } from 'src/app/model/Marchee';
import { Organisation } from 'src/app/model/Organisation';
import { ArticleRService } from 'src/app/service/article-r.service';
import { BondeCommandeService } from 'src/app/service/bonde-commande.service';
import { LoginService } from 'src/app/service/login.service';
import { MarcheeService } from 'src/app/service/marchee.service';
import { OrganisationServiceService } from 'src/app/service/organisation-service.service';

@Component({
  selector: 'app-connsulter-attachement',
  templateUrl: './connsulter-attachement.component.html',
  styleUrls: ['./connsulter-attachement.component.css']
})
export class ConnsulterAttachementComponent implements OnInit {

  idOrgan:number=2;
  organisationConnectee!: Organisation;
  username!: string;
  marchees!: Marchee[];
  bonsdeCommandes!: BondeCommande[];

  idMarcheeC!: number;
  marcheeC!: Marchee;
  bondeCommandeC!: BondeCommande;

  attachementsGlobals!: Article[];
  attachementsJournaliers!: Article[];
  attachementsParPeriode!: Article[];
  dateA!: Date;
  date1!: Date;
  date2!: Date;

  constructor(private loginService:LoginService,private organisationService:OrganisationServiceService,private marcheeService:MarcheeService,private bondeCommandeService:BondeCommandeService,private articleRservice:ArticleRService) { }

  ngOnInit(): void {
    this.onGetOrganisationbyUser();
    
  }

   //récuperer l'organisation connecté actuellement
   public onGetOrganisationbyUser():void{
    this.username=this.loginService.loggedUser;
    this.organisationService.getOrganisationbyUserName(this.username).subscribe({
      next: (response:Organisation) => {
        this.organisationConnectee=response;
        console.log("organisation conectee"+this.organisationConnectee);
        this.onGetmarchees();
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);

       },
      complete: () => console.info('complete') 
  })
  }

  //event lors du choix du code du marché
  getMarcheeChoisis(marcheeIndice:number){
    console.log("indice du marchee choisis"+marcheeIndice);
    this.marcheeC=this.marchees[marcheeIndice];
    this.getBondesCommandes(this.marcheeC.id); 
  }

  //event lors du choix du code du bon de Commande
  getBondeCommandeChoisis(bondeCommandeIndice:number){
    console.log("indice du bc choisis"+bondeCommandeIndice);
    this.bondeCommandeC=this.bonsdeCommandes[bondeCommandeIndice];
    this.getAttachementGlobal(this.bondeCommandeC.id);
  }

   //event lors du choix du date d'attachement journalier
   getDateAttachementJournalier(dateAjournalier:Date){
    console.log("date d'attachement journalier"+dateAjournalier);
    this.getAttachementJournalier(this.bondeCommandeC.id,dateAjournalier);
  }


   //récuperer la liste des marchhees dans l'organisation connecté
   public onGetmarchees():void{
    this.marcheeService.getMarchees(this.idOrgan).subscribe({
      next: (response:Marchee[]) => {
        this.marchees=response;
        console.log("marchees de l'organisation connecté"+this.marchees)
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);

       },
      complete: () => console.info('complete') 
  })
  }

   //recuperer les bon de commandes du marchee choisis
   public getBondesCommandes(idMarchee:number):void{
    this.bondeCommandeService.getAllBondeCommandeJoinbyMarcheeId(idMarchee).subscribe({
     next: (response:BondeCommande[]) =>{
       this.bonsdeCommandes=response;
       console.log("bon de commandes du marchee choisis "+this.marcheeC?.designiation+" sont les suivants"+this.bonsdeCommandes);
       
     },
     error: (error:HttpErrorResponse) => {
       alert(error.message);

      },
     complete: () => console.info('get bondes commandes by marchee and organisation complete') 
 })  

 }

   //recuperer les attachements globals
   public getAttachementGlobal(idbc:number):void{
    this.articleRservice.getArticlesRealiseesbybcId(this.bondeCommandeC.id).subscribe({
     next: (response:Article[]) =>{
       this.attachementsGlobals=response.sort((a, b) => (a.typeLib > b.typeLib) ? 1 : -1);
      // this.attachementsGlobals = this.attachementsGlobals.sort((a,b) => a.typeLib > b.typeLib ? 1 : -1);
       
     },
     error: (error:HttpErrorResponse) => {
       alert(error.message);

      },
     complete: () => console.info('get attachements globals by bc complete') 
 })  

 }

 //recuperer les attachements journaliers
 public getAttachementJournalier(idbc:number,dateA:Date):void{
  this.articleRservice.getArticlesRealiseesJournalierbybcId(this.bondeCommandeC.id,dateA).subscribe({
   next: (response:Article[]) =>{
     this.attachementsJournaliers=response.sort((a, b) => (a.typeLib > b.typeLib) ? 1 : -1);
     
   },
   error: (error:HttpErrorResponse) => {
     alert(error.message);

    },
   complete: () => console.info('get attachements journaliers by bc complete') 
})  

}

//recuperer les attachements par periode
public getAttachementParPeriode(idbc:number,date1:Date,date2:Date):void{
  this.articleRservice.getArticlesRealiseesbybcIdparPeriode(this.bondeCommandeC.id,date1,date2).subscribe({
   next: (response:Article[]) =>{
     this.attachementsParPeriode=response.sort((a, b) => (a.typeLib > b.typeLib) ? 1 : -1);
     
   },
   error: (error:HttpErrorResponse) => {
     alert(error.message);

    },
   complete: () => console.info('get attachements par periode by bc complete') 
})  

}



}
