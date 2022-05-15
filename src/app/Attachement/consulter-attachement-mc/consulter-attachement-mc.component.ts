import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/model/Article';
import { BondeCommande } from 'src/app/model/BondeCommande';
import { Marchee } from 'src/app/model/Marchee';
import { OrdreDeTraveaux } from 'src/app/model/OrdreDeTraveaux';
import { Organisation } from 'src/app/model/Organisation';
import { ArticleRService } from 'src/app/service/article-r.service';
import { ArticleRealiseeMCService } from 'src/app/service/article-realisee-mc.service';
import { BondeCommandeService } from 'src/app/service/bonde-commande.service';
import { LoginService } from 'src/app/service/login.service';
import { MarcheeService } from 'src/app/service/marchee.service';
import { OrdreDeTraveauxService } from 'src/app/service/ordre-de-traveaux.service';
import { OrganisationServiceService } from 'src/app/service/organisation-service.service';

@Component({
  selector: 'app-consulter-attachement-mc',
  templateUrl: './consulter-attachement-mc.component.html',
  styleUrls: ['./consulter-attachement-mc.component.css']
})
export class ConsulterAttachementMCComponent implements OnInit {

  organisationConnectee!: Organisation;
  username!: string;
  marchees!: Marchee[];
  bonsdeCommandes!: BondeCommande[];
  ordresDeTraveaux!: OrdreDeTraveaux[];

  idMarcheeC!: number;
  marcheeC!: Marchee;
  bondeCommandeC!: BondeCommande;
  ordreDeTraveauxC!: OrdreDeTraveaux;

  attachementsGlobalsPrestations!: Article[];
  attachementsJournaliersPrestations!: Article[];
  attachementsParPeriodePrestations!: Article[];

  attachementsGlobalsMFs!: Article[];
  attachementsJournaliersMFs!: Article[];
  attachementsParPeriodeMFs!: Article[];

  attachementsGlobalsMateriels!: Article[];
  attachementsJournaliersMateriels!: Article[];
  attachementsParPeriodeMateriels!: Article[];

  dateA!: Date;
  date1!: Date;
  date2!: Date;

  constructor(private loginService:LoginService,private organisationService:OrganisationServiceService,private marcheeService:MarcheeService,private bondeCommandeService:BondeCommandeService,private articleRealiseeMCService:ArticleRealiseeMCService,private ordreTraveauxService:OrdreDeTraveauxService) { }

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
    this.getOrdresTraveaux(this.bondeCommandeC.id);
   
  }

   //event lors du choix du code d'orde de traveaux
   getOrdreTraveauxChoisis(otIndice:number){
    console.log("indice du ot choisis"+otIndice);
    this.ordreDeTraveauxC=this.ordresDeTraveaux[otIndice];
    this.getAttachementGlobalPrestations(this.ordreDeTraveauxC.id);
    this.getAttachementGlobalMFs();
    this.getAttachementGlobalMateriels();
  }

   //event lors du choix du date d'attachement journalier
   getDateAttachementJournalier(dateAjournalier:Date){
    console.log("date d'attachement journalier"+dateAjournalier);
    this.getAttachementJournalierPrestations(this.ordreDeTraveauxC?.id,dateAjournalier);
    this.getAttachementJournalierMFs(dateAjournalier);
    this.getAttachementJournalierMateriels(dateAjournalier);
  }


   //récuperer la liste des marchhees dans l'organisation connecté
   public onGetmarchees():void{
    this.marcheeService.getMarcheestypeMCbyorganisationId(this.organisationConnectee.id).subscribe({
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

 
   //recuperer les ordres de traveaux du bc choisis
   public getOrdresTraveaux(idBC:number):void{
    this.ordreTraveauxService.getOTsBybcID(idBC).subscribe({
     next: (response:OrdreDeTraveaux[]) =>{
       this.ordresDeTraveaux=response;
       console.log("ots du bc choisis "+this.bondeCommandeC?.codebc+" sont les suivants"+this.ordresDeTraveaux);
       
     },
     error: (error:HttpErrorResponse) => {
       alert(error.message);

      },
     complete: () => console.info('get ots by bc complete') 
 })  

 }


   //recuperer les attachements globals (prestations)
   public getAttachementGlobalPrestations(idot:number):void{
    this.articleRealiseeMCService.getArticlesRealiseesPresbyotId(this.ordreDeTraveauxC.id).subscribe({
     next: (response:Article[]) =>{
       this.attachementsGlobalsPrestations=response.sort((a, b) => (a.typeLib > b.typeLib) ? 1 : -1);
      // this.attachementsGlobals = this.attachementsGlobals.sort((a,b) => a.typeLib > b.typeLib ? 1 : -1);
       
     },
     error: (error:HttpErrorResponse) => {
       alert(error.message);

      },
     complete: () => console.info('get attachements globals by ot complete') 
 })  

 }

 //recuperer les attachements journaliers (prestations)
 public getAttachementJournalierPrestations(idot:number,dateA:Date):void{
  this.articleRealiseeMCService.getArticlesRealiseesPresJournalierbyotId(this.ordreDeTraveauxC.id,dateA).subscribe({
   next: (response:Article[]) =>{
     this.attachementsJournaliersPrestations=response.sort((a, b) => (a.typeLib > b.typeLib) ? 1 : -1);
     
   },
   error: (error:HttpErrorResponse) => {
     alert(error.message);

    },
   complete: () => console.info('get attachements journaliers by bc complete') 
})  

}

//recuperer les attachements par periode(prestations)
public getAttachementParPeriodePrestations(date1:Date,date2:Date):void{
  this.articleRealiseeMCService.getArticlesRealiseesPresbyotIdparPeriode(this.ordreDeTraveauxC.id,date1,date2).subscribe({
   next: (response:Article[]) =>{
     this.attachementsParPeriodePrestations=response.sort((a, b) => (a.typeLib > b.typeLib) ? 1 : -1);
     
   },
   error: (error:HttpErrorResponse) => {
     alert(error.message);

    },
   complete: () => console.info('get attachements par periode by ot complete') 
})  

}

public getAllAttachementsParPeriode(date1:Date,date2:Date):void{
  this.getAttachementParPeriodePrestations(date1,date2);
  this.getAttachementParPeriodeMFs(date1,date2);
  this.getAttachementParPeriodeMateriels(date1,date2);

}

 //recuperer les attachements globals (MFs)
 public getAttachementGlobalMFs():void{
  this.articleRealiseeMCService.getArticlesRealiseesMFbyotId(this.ordreDeTraveauxC.id).subscribe({
   next: (response:Article[]) =>{
     this.attachementsGlobalsMFs=response.sort((a, b) => (a.typeLib > b.typeLib) ? 1 : -1);
    // this.attachementsGlobals = this.attachementsGlobals.sort((a,b) => a.typeLib > b.typeLib ? 1 : -1);
     
   },
   error: (error:HttpErrorResponse) => {
     alert(error.message);

    },
   complete: () => console.info('get attachements globals by ot complete') 
})  

}

//recuperer les attachements journaliers (MFs)
public getAttachementJournalierMFs(dateA:Date):void{
this.articleRealiseeMCService.getArticlesRealiseesMFJournalierbyotId(this.ordreDeTraveauxC.id,dateA).subscribe({
 next: (response:Article[]) =>{
   this.attachementsJournaliersMFs=response.sort((a, b) => (a.typeLib > b.typeLib) ? 1 : -1);
   
 },
 error: (error:HttpErrorResponse) => {
   alert(error.message);

  },
 complete: () => console.info('get attachements journaliers by ot complete') 
})  

}

//recuperer les attachements par periode(MFs)
public getAttachementParPeriodeMFs(date1:Date,date2:Date):void{
this.articleRealiseeMCService.getArticlesRealiseesMFbyotIdparPeriode(this.ordreDeTraveauxC.id,date1,date2).subscribe({
 next: (response:Article[]) =>{
   this.attachementsParPeriodeMFs=response.sort((a, b) => (a.typeLib > b.typeLib) ? 1 : -1);
   
 },
 error: (error:HttpErrorResponse) => {
   alert(error.message);

  },
 complete: () => console.info('get attachements par periode by ot complete') 
})  

}


 //recuperer les attachements globals (MFs)
 public getAttachementGlobalMateriels():void{
  this.articleRealiseeMCService.getArticlesRealiseesMaterielbyotId(this.ordreDeTraveauxC.id).subscribe({
   next: (response:Article[]) =>{
     this.attachementsGlobalsMateriels=response.sort((a, b) => (a.typeLib > b.typeLib) ? 1 : -1);
    // this.attachementsGlobals = this.attachementsGlobals.sort((a,b) => a.typeLib > b.typeLib ? 1 : -1);
     
   },
   error: (error:HttpErrorResponse) => {
     alert(error.message);

    },
   complete: () => console.info('get attachements globals by ot complete') 
})  

}

//recuperer les attachements journaliers (MFs)
public getAttachementJournalierMateriels(dateA:Date):void{
this.articleRealiseeMCService.getArticlesRealiseesMaterielJournalierbyotId(this.ordreDeTraveauxC.id,dateA).subscribe({
 next: (response:Article[]) =>{
   this.attachementsJournaliersMateriels=response.sort((a, b) => (a.typeLib > b.typeLib) ? 1 : -1);
   
 },
 error: (error:HttpErrorResponse) => {
   alert(error.message);

  },
 complete: () => console.info('get attachements journaliers by ot complete') 
})  

}

//recuperer les attachements par periode(MFs)
public getAttachementParPeriodeMateriels(date1:Date,date2:Date):void{
this.articleRealiseeMCService.getArticlesRealiseesMaterielbyotIdparPeriode(this.ordreDeTraveauxC.id,date1,date2).subscribe({
 next: (response:Article[]) =>{
   this.attachementsParPeriodeMateriels=response.sort((a, b) => (a.typeLib > b.typeLib) ? 1 : -1);
   
 },
 error: (error:HttpErrorResponse) => {
   alert(error.message);

  },
 complete: () => console.info('get attachements par periode by ot complete') 
})  

}
}
