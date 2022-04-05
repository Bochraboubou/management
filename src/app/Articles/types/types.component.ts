import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Article } from 'src/app/model/Article';
import { Metier } from 'src/app/model/Metier';
import { Secteur } from 'src/app/model/Secteur';
import { Type } from 'src/app/model/Type';
import { ArticleService } from 'src/app/service/article.service';
import { MetierService } from 'src/app/service/metier.service';
import { SecteurService } from 'src/app/service/secteur.service';
import { TypeService } from 'src/app/service/type.service';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css']
})
export class TypesComponent implements OnInit {
  secteurs!: Secteur[];
  metiers!: Metier[];
  types!: Type[];
  secteurC!: Secteur;
  metierC!: Metier;
  searchT:any;

  totalLength:any;
  page:number = 1;
  alerteLibTypeutilisee:boolean = false;

  
  chosenSecteur!: Secteur;

 
  constructor(private secteurService:SecteurService,private metierService:MetierService,private typeService:TypeService,private toastr: ToastrService) {}

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
     button.setAttribute('data-target','#addTypeModal');
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
    this.getTypes(metierId);
    
    

    

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



  //recuperer les metiers liés au secteur choisis
  public getMetiers(idSecteur:number):void{
     //récuperer les metiers par secteurs
     this.metierService.getMetiersBySecteur(idSecteur).subscribe({
      next: (response:Metier[]) =>{
        this.metiers=response;
        console.log("metiers du du secteur de id "+this.secteurC.id+" sont les suivants"+response);
        
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);

       },
      complete: () => console.info('complete') 
  })  

  }

   //récuperer la liste des types
  public getTypes(idMetier:number):void{
    this.typeService.getTypessByMetier(idMetier).subscribe({
      next: (response:Type[]) => {
      this.types=response;
        console.log("types par metiers"+this.types);
        this.totalLength=this.types.length;
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);

       },
      complete: () => console.info('complete') 
  })
  }
  



   //ajouter un type
   public addType(idMetier:number,type:Type):void{
    this.typeService.addType(idMetier,type).subscribe({
     next: (response:Type) =>{
       console.log("id du type ajoutee "+response.id);
       this.getTypes(this.metierC.id);
       
     },
     error: (error:HttpErrorResponse) => {
      alert(error.message);

      },
     complete: () => console.info('complete') 
 })  

 }

//ajout du type apres le clic du bouton ajouter
 public ajouterType(typeForm:NgForm):void{
  this.typeService.getTypebyLib(typeForm.value.typeLib).subscribe({
    next: (response:Type) => {
      this.alerteLibTypeutilisee=true;
      console.log(" nom du type :   "+typeForm.value.typeLib+"  est deja utilisee");
     
    },
    error: (error:HttpErrorResponse) => {
      this.addType(this.metierC.id,typeForm.value);
      document.getElementById('closeAjoutModal')?.click();
      typeForm.reset();
     },
    complete: () => console.info('complete') 
})
 
 }


//fermer un alerte
public closeAlert():void{
  this.alerteLibTypeutilisee = false;
 
}



}
