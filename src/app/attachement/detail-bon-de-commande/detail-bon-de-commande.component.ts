import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/model/Article';
import { ArticleUtilisee } from 'src/app/model/ArticleUtilisee';
import { BondeCommande } from 'src/app/model/BondeCommande';
import { ArticleUtiliseeService } from 'src/app/service/article-utilisee.service';
import { ArticleService } from 'src/app/service/article.service';
import { BondeCommandeService } from 'src/app/service/bonde-commande.service';

@Component({
  selector: 'app-detail-bon-de-commande',
  templateUrl: './detail-bon-de-commande.component.html',
  styleUrls: ['./detail-bon-de-commande.component.css']
})
export class DetailBonDeCommandeComponent implements OnInit {
id!:number
bondeCommande!:BondeCommande
articleUtulisee!:ArticleUtilisee
artU!:ArticleUtilisee
articlesUtulisees!:ArticleUtilisee[]
article!:Article
code!:string
alertecodeArticle=0
  constructor(private artService:ArticleService,private articleUtuliseeService:ArticleUtiliseeService,private route:ActivatedRoute,private BCService:BondeCommandeService) { }

  ngOnInit(): void {

    this.id=this.route.snapshot.params['id'];
       this.bondeCommande=new BondeCommande();
       this.BCService.getBCbyId(this.id).subscribe(
         data=>{
           this.bondeCommande=data;

           console.log(this.bondeCommande)
          
         }
       )
       this.trouverArticles();
  }


 trouverArticles(){
   this.articleUtuliseeService.getArticlesUtiliseesbyBC(this.id).subscribe({
    next: (response:ArticleUtilisee[]) => {
      this.articlesUtulisees=response;
      for( let i=0;i<this.articlesUtulisees.length;i++){
        this.trouvercode(this.articlesUtulisees[i]);
      }
      },
        error: (error:HttpErrorResponse) => {
          console.log(error.message);
         // alert("vous n'etes plus attaché a une organisation")
         },
        complete: () => console.info('complete') 
      })
  }

  trouvercode(artUtl:ArticleUtilisee){
    this.artService.getArticlebyId(artUtl.id.article_id).subscribe({
      next: (response:Article) => {
        this.article=response;
        artUtl.codeArt=this.article.code
     
       
        },
          error: (error:HttpErrorResponse) => {
            console.log(error.message);
           // alert("vous n'etes plus attaché a une organisation")
           },
          complete: () => console.info('complete') 
        }) 

  }




/*

  chercher(){
console.log(this.code)

this.artService.getArticlebyCode(this.code).subscribe({
  next: (response:Article) => {
   this.article=response
   console.log("oui il existe")

  },
  error: (error:HttpErrorResponse) => {
    console.log(error.message);
    this.alertecodeArticle=1
   // alert("vous n'etes plus attaché a une organisation")
   },
  complete: () => console.info('complete')  
})

  }
  //get code of article utulisee
  getCodeArticleUtuliseeByArticleId(id:number){
this.articleUtuliseeService.getArticlesUtiliseesbyArticle(id).subscribe({
  
})
  } 

*/

  recherche2(){
    for (let i=0;i<this.articlesUtulisees.length;i++){
      if(this.articlesUtulisees[i].codeArt==this.code){
        console.log("ouiiii existe")

        this.artService.getArticlebyCode(this.code).subscribe({
          next: (response:Article) =>{
           this.article=response
           console.log(this.article.designation)
           console.log(this.article.unitee)
           console.log("oui il existe")
        
          },
          error: (error:HttpErrorResponse) => {
            console.log(error.message);
            this.alertecodeArticle=1
           // alert("vous n'etes plus attaché a une organisation")
           },
          complete: () => console.info('complete')  
        })


      }


      else{
        this.alertecodeArticle=1
      }
    }
  }
}
