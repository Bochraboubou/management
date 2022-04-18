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
  selector: 'app-secteurs',
  templateUrl: './secteurs.component.html',
  styleUrls: ['./secteurs.component.css']
})
export class SecteursComponent implements OnInit {
  secteurs!: Secteur[];
  searchS:any;
  deletedSecteur!: Secteur;
  totalLength:any;
  page:number = 1;
  alerteNomSecteurutilisee:boolean = false;
  alerteSupSecteurUtilisee:boolean=false;
  alerteModifSecteurUtilisee:boolean=false;
  secteurAmodifier!: Secteur;

  


 
  constructor(private secteurService:SecteurService,private metierService:MetierService) {}

  ngOnInit(): void {
    this.onGetSecteurs();
  }

   //Modal pour l'ajout d'un secteur
   public onOpenAddSecteurModal():void{
    const container=document.getElementById('main-container');
     const button=document.createElement('button');
     button.type='button';
     button.style.display='none';
     button.setAttribute('data-toggle','modal');
     button.setAttribute('data-target','#addSecteurModal');
     container?.appendChild(button);
     button.click();
 
   }


   //Modal pour la suppression et la modification d'un secteur
   public onOpenDeleteandModifSecteurModal(secteur:Secteur,mode:string):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if(mode==='modifier')
    {
      this.secteurAmodifier=secteur;
      this.metierService.getMetiersBySecteur(secteur.id).subscribe({
        next: (response:Metier[]) => {
          console.log("metiers par secteur :  "+response);
          let metiersList=response;
          if(metiersList.length!=0){
            this.alerteModifSecteurUtilisee=true;
    
          }else{
            button.setAttribute('data-target','#modifierSecteurModal');
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
      this.deletedSecteur=secteur;
      this.metierService.getMetiersBySecteur(secteur.id).subscribe({
        next: (response:Metier[]) => {
          console.log("metiers par secteur :  "+response);
          let metiersList=response;
          if(metiersList.length!=0){
            this.alerteSupSecteurUtilisee=true;
    
          }else{
           button.setAttribute('data-target','#supprimerSecteurModal');
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

   //ajouter une secteur
   public addSecteur(secteur:Secteur):void{
    this.secteurService.addSecteur(secteur).subscribe({
     next: (response:Secteur) =>{
       console.log("id du secteur ajoutee "+response.id);
       this.onGetSecteurs();
       
     },
     error: (error:HttpErrorResponse) => {
      alert(error.message);

      },
     complete: () => console.info('complete') 
 })  

 }

 
   //supprimer un secteur
   public deleteSecteur(idSecteur:number):void{
    this.secteurService.deleteSecteur(idSecteur).subscribe({
     next: (response:void) =>{
       console.log("reponse de suppression "+response);
       this.onGetSecteurs();
       
     },
     error: (error:HttpErrorResponse) => {
      alert(error.message);

      },
     complete: () => console.info('complete') 
 })  

 }
//ajout du secteur apres le clic du bouton ajouter
 public ajouterSecteur(seceteurForm:NgForm):void{
  this.secteurService.getSecteurbyNom(seceteurForm.value.nomSecteur).subscribe({
    next: (response:Secteur) => {
      this.alerteNomSecteurutilisee=true;
      console.log(" nom du secteur :   "+seceteurForm.value.nomMetier+"  est deja utilisee");
     
    },
    error: (error:HttpErrorResponse) => {
      this.addSecteur(seceteurForm.value);
      document.getElementById('closeAjoutModal')?.click();
      seceteurForm.reset();
     },
    complete: () => console.info('complete') 
})
 
 }

 //suppression du secteur apres le clic du bouton supprimer
 public supprimerSecteur(idSecteur:number):void{
  this.deleteSecteur(idSecteur);
  document.getElementById('closeSuppressionModal')?.click();
}

//modifier un secteur s'il nest pas utilisee;
public modifierSecteur(modifiedSecteurForm:NgForm):void{
  this.secteurService.editSecteur(modifiedSecteurForm.value.id,modifiedSecteurForm.value).subscribe({
    next: (response:Secteur) =>{
      console.log("id du secteur modifiee "+response.id);
      this.onGetSecteurs();
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
  this.alerteNomSecteurutilisee = false;
  this.alerteSupSecteurUtilisee=false;
  this.alerteModifSecteurUtilisee=false;
 
}


}
