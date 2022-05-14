import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/model/Article';
import { BondeCommande } from 'src/app/model/BondeCommande';
import { BonDeLivraisonProjet } from 'src/app/model/Bon_De_Livraison';
import { Marchee } from 'src/app/model/Marchee';
import { Metier } from 'src/app/model/Metier';
import { Organisation } from 'src/app/model/Organisation';
import { ArticleRService } from 'src/app/service/article-r.service';
import { BonLivraisonProjetService } from 'src/app/service/bon-livraison-projet.service';
import { BondeCommandeService } from 'src/app/service/bonde-commande.service';
import { LoginService } from 'src/app/service/login.service';
import { MarcheeService } from 'src/app/service/marchee.service';
import { MetierService } from 'src/app/service/metier.service';
import { OrganisationServiceService } from 'src/app/service/organisation-service.service';

@Component({
  selector: 'app-consulter-materiel',
  templateUrl: './consulter-materiel.component.html',
  styleUrls: ['./consulter-materiel.component.css']
})
export class ConsulterMaterielComponent implements OnInit {

  organisationConnectee!: Organisation;
  username!: string;
  marchees!: Marchee[];
  bonsdeCommandes!: BondeCommande[];

  idMarcheeC!: number;
  marcheeC!: Marchee;
  bondeCommandeC!: BondeCommande;
  metierC!: Metier;
  bonsDelivraison!: BonDeLivraisonProjet[];

  searchBL:any;

  BLstotalLength:any;
  BLpage:number = 1;



 
  constructor(private loginService:LoginService,private organisationService:OrganisationServiceService,private marcheeService:MarcheeService,private bondeCommandeService:BondeCommandeService,private bondeLivraisonService:BonLivraisonProjetService,private metierService :MetierService) { }

  ngOnInit(): void {
    this.onGetOrganisationbyUser();
    
  }

   //Collapse pour l'affichage du amteriels livrés
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
    this.getMetierByMarchee(this.marchees[marcheeIndice].id);
  }

  //event lors du choix du code du bon de Commande
  getBondeCommandeChoisis(bondeCommandeIndice:number){
    console.log("indice du bc choisis"+bondeCommandeIndice);
    this.bondeCommandeC=this.bonsdeCommandes[bondeCommandeIndice];
    this.getBonsdeLivraison(this.bonsdeCommandes[bondeCommandeIndice].id);
  }

   //récuperer la liste des marchhees dans l'organisation connecté
   public onGetmarchees():void{
    this.marcheeService.getMarcheestypeProjetbyorganisationId(this.organisationConnectee.id).subscribe({
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

    //recuperer le metier du marché
    public getMetierByMarchee(idMarchee:number):void{
      this.metierService.getMetierbyMarchee(idMarchee).subscribe({
       next: (response:Metier) =>{
         this.metierC = response;
         console.log("metier du marché"+this.metierC.nomMetier);
         
       },
       error: (error:HttpErrorResponse) => {
         alert(error.message);
  
        },
      complete: () => console.info('get metier by marchee complete') 
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

  //recuperer les bon de livraison du BC choisis
  public getBonsdeLivraison(idBC:number):void{
    this.bondeLivraisonService.getAllbonsdelivraisonsBybcId(idBC).subscribe({
     next: (response:BonDeLivraisonProjet[]) =>{
       this.bonsDelivraison=response;
       for (let i = 0; i < this.bonsDelivraison.length; i++) {
        this.getMaterielslivrés(this.bonsDelivraison[i]);
      }
       this.BLstotalLength = response.length;
       console.log("bons de livraison du BC choisis "+this.bondeCommandeC?.codebc+" sont les suivants"+this.bonsDelivraison);
       
     },
     error: (error:HttpErrorResponse) => {
       alert(error.message);

      },
     complete: () => console.info('get bons de livraisons by BC complete') 
 })  

 }

  //recuperer le materiels livré du BL
  public getMaterielslivrés(BL:BonDeLivraisonProjet):void{
    this.bondeLivraisonService.getMaterielsBuBL(BL.bl_id).subscribe({
     next: (response:Article[]) =>{
       BL.listeMateriel = response;
       console.log("get materiel du BL"+BL.codeBonLivraisonProj);
       
     },
     error: (error:HttpErrorResponse) => {
       alert(error.message);

      },
    complete: () => console.info('get materiels by BL complete') 
 })  

 }

 




}
