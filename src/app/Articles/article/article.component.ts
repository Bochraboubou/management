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
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  secteurs!: Secteur[];
  metiers!: Metier[];
  articles!: Article[];
  types!: Type[];
  secteurC!: Secteur;
  metierC!: Metier;
  searchA:any;
  idType!: number;
  affich:boolean = false;
  deletedMetier!: Metier;
  totalLength:any;
  page:number = 1;
  alerteCodeArticleutilisee:boolean = false;

  
  chosenSecteur!: Secteur;
  nour!: string;

 
  constructor(private secteurService:SecteurService,private metierService:MetierService,private articleService:ArticleService,private toastr: ToastrService,private typeService:TypeService) {}

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
     button.setAttribute('data-target','#addArticleModal');
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
    //this.metierC=new Metier();
    //this.articles=[];
    this.getMetiers(secteurId);
    
 
    

  }
   //event lors du choix du secteur
   getMetierChoisis(metierId:number){
    console.log("id du metier choisis"+metierId);
    this.onGetMetierById(metierId);
    this.getArticles(metierId);
    this.getTypes(metierId);
    this.affich=true;
    

    

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
       // console.log("metiers du du secteur de id "+this.secteurC.id+" sont les suivants"+response);
        
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);

       },
      complete: () => console.info('complete') 
  })  

  }

  //récuperer la liste des articles
  public getArticles(idMetier:number):void{
    this.articleService.getArticlebyMetierId(idMetier).subscribe({
      next: (response:Article[]) => {
        this.articles=response;
        console.log("articles"+this.secteurs)
        this.totalLength=this.articles.length;
        for (let i = 0; i < this.articles.length; i++){
          this.getTypeByArticle(this.articles[i])

        }
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
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);

       },
      complete: () => console.info('complete') 
  })
  }

  //récuperer le type d'article
 public getTypeByArticle(article:Article):void{
  this.typeService.getTypebyArticleId(article.id).subscribe({
    next: (response:Type) => {
      article.typeArticle=response.typeLib;
      console.log("type cherchee :  "+article.typeArticle);
    
    },
    error: (error:HttpErrorResponse) => {
      console.log("typee non trouvee");
    
    
     },
     complete: () => console.info('type by article complete') 
})

}
public affichili():void{
 
  console.log("etype howa nour var "+this.nour);
}
   
 


  



   //ajouter un article
   public addArticle(idMetier:number,idType:number,article:Article):void{
    this.articleService.addArticle(idMetier,idType,article).subscribe({
     next: (response:Article) =>{
       console.log("id du article ajoutee "+response.id);
       this.getArticles(this.metierC.id);
       
     },
     error: (error:HttpErrorResponse) => {
      alert(error.message);

      },
     complete: () => console.info('complete') 
 }) 
 }

//ajout d'article apres le clic du bouton ajouter
 public ajouterArticle(articleForm:NgForm):void{
  this.articleService.getArticlebyCode(articleForm.value.code).subscribe({
    next: (response:Article) => {
      this.alerteCodeArticleutilisee=true;
      console.log(" nom du type :   "+articleForm.value.code+"  est deja utilisee");
     
    },
    error: (error:HttpErrorResponse) => {
      this.addArticle(this.metierC.id,this.idType,articleForm.value);
      document.getElementById('closeAjoutModal')?.click();
      articleForm.reset();
     },
    complete: () => console.info('complete') 
})
 
 }
 


//fermer un alerte
public closeAlert():void{
  this.alerteCodeArticleutilisee = false;
 
}



}