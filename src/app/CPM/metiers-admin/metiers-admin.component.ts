import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Article } from 'src/app/model/Article';
import { Metier } from 'src/app/model/Metier';
import { Secteur } from 'src/app/model/Secteur';
import { ArticleService } from 'src/app/service/article.service';
import { MetierService } from 'src/app/service/metier.service';
import { SecteurService } from 'src/app/service/secteur.service';

@Component({
  selector: 'app-metiers-admin',
  templateUrl: './metiers-admin.component.html',
  styleUrls: ['./metiers-admin.component.css']
})
export class MetiersAdminComponent implements OnInit {
  secteurs!: Secteur[];
  metiers!: Metier[];
  secteur!: Secteur;
  searchM:any;
  affich:boolean = false;
  deletedMetier!: Metier;
  totalLength:any;
  page:number = 1;
  alerteNomMetierutilisee:boolean = false;
  alerteSupMetierUtilisee:boolean=false;
  alerteModifMetierUtilisee:boolean=false;
  metierAmodifier!: Metier;

  


 
  constructor(private secteurService:SecteurService,private metierService:MetierService,private articleService:ArticleService) {}

  ngOnInit(): void {
    this.onGetSecteurs();
  }

   //Modal pour l'ajout d'un metier
   public onOpenAddMetierModal():void{
    const container=document.getElementById('main-container');
     const button=document.createElement('button');
     button.type='button';
     button.style.display='none';
     button.setAttribute('data-toggle','modal');
     button.setAttribute('data-target','#addMetierModal');
     container?.appendChild(button);
     button.click();
 
   }


   //Modal pour la suppression et la modification d'un metier
   public onOpenDeleteandModifMetierModal(metier:Metier,mode:string):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if(mode==='modifier')
    {
      this.metierAmodifier=metier;
      this.articleService.getArticlebyMetierId(metier.id).subscribe({
        next: (response:Article[]) => {
          console.log("articles par metier :  "+response);
          let artcs=response;
          if(artcs.length!=0){
            this.alerteModifMetierUtilisee=true;
    
          }else{
            button.setAttribute('data-target','#modifierMetierModal');
            container?.appendChild(button);
            button.click();
          }
        },
        error: (error:HttpErrorResponse) => {
          alert(error.message);
         },
        complete: () => console.info('complete') 
     })
    }
    if(mode==='supprimer')
    {
      this.deletedMetier=metier;
      this.articleService.getArticlebyMetierId(metier.id).subscribe({
        next: (response:Article[]) => {
          console.log("articles par metier :  "+response);
          let artcs=response;
          if(artcs.length!=0){
            this.alerteSupMetierUtilisee=true;
    
          }else{
           button.setAttribute('data-target','#supprimerMetierModal');
           container?.appendChild(button);
           button.click();
          }
        },
        error: (error:HttpErrorResponse) => {
          alert(error.message);
         },
        complete: () => console.info('complete') 
     })    
    }
     

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
    this.affich=true;

    

  }

   //récuperer le secteur choisis
   public onGetSecteurById(idSecteur:number):void{
    this.secteurService.getSecteurbyId(idSecteur).subscribe({
      next: (response:Secteur) => {
        this.secteur=response;
        console.log(" nom du desecteur choisis :   "+this.secteur.nomSecteur+"  id u secteur choisis :   "+this.secteur.id);
       
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);

       },
      complete: () => console.info('complete') 
  })
  }

  //recuperer les metiers liés au secteur choisis
  public getMetiers(idSecteur:number):void{
     //récuperer les metiers par secteurs
     this.metierService.getMetiersBySecteur(idSecteur).subscribe({
      next: (response:Metier[]) =>{
        this.metiers=response;
        console.log("metiers du du secteur de id "+this.secteur?.id+" sont les suivants"+response);
        this.totalLength=this.metiers.length;
        
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);

       },
      complete: () => console.info('complete') 
  })  

  }



   //ajouter une metier
   public addMetier(idSecteur:number,metier:Metier):void{
    this.metierService.addMetier(idSecteur,metier).subscribe({
     next: (response:Metier) =>{
       console.log("id du metier ajoutee "+response.id);
       this.getMetiers(this.secteur.id);
       
     },
     error: (error:HttpErrorResponse) => {
      alert(error.message);

      },
     complete: () => console.info('complete') 
 })  

 }

 
   //supprimer un metier
   public deleteMetier(idMetier:number):void{
    this.metierService.deleteMetier(idMetier).subscribe({
     next: (response:void) =>{
       console.log("reponse de suppression "+response);
       this.getMetiers(this.secteur.id);
       
     },
     error: (error:HttpErrorResponse) => {
      alert(error.message);

      },
     complete: () => console.info('complete') 
 })  

 }
//ajout du metier apres le clic du bouton ajouter
 public ajouterMetier(metierForm:NgForm):void{
  this.metierService.getMetierbyNom(metierForm.value.nomMetier).subscribe({
    next: (response:Metier) => {
      this.alerteNomMetierutilisee=true;
      console.log(" nom du metier :   "+metierForm.value.nomMetier+"  est deja utilisee");
     
    },
    error: (error:HttpErrorResponse) => {
      this.addMetier(this.secteur.id,metierForm.value);
      document.getElementById('closeAjoutModal')?.click();
      metierForm.reset();
     },
    complete: () => console.info('complete') 
})
 
 }

 //suppression du metier apres le clic du bouton supprimer
 public supprimerMetier(idMetier:number):void{
  this.deleteMetier(idMetier);
  document.getElementById('closeSuppressionModal')?.click();
}

//modifier un Metier s'il nest pas utilisee;
public modifierMetier(modifiedMetier:NgForm):void{
  this.metierService.editMetier(this.metierAmodifier.id,modifiedMetier.value).subscribe({
    next: (response:Metier) =>{
      console.log("id du metier modifiee "+response.id);
      this.getMetiers(this.secteur.id);
      document.getElementById('closeModifModal')?.click();
      
    },
    error: (error:HttpErrorResponse) => {
     alert(error.message);

     },
    complete: () => console.info('complete') 
})  
}



//fermer un alerte
public closeAlert():void{
  this.alerteNomMetierutilisee = false;
  this.alerteSupMetierUtilisee=false;
  this.alerteModifMetierUtilisee=false;
 
}




}
