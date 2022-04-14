import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/model/Article';
import { ArticleRealisee } from 'src/app/model/ArticleRealisee';
import { ArticleRealiseeId } from 'src/app/model/ArticleRealiseeId';
import { ArticleUtilisee } from 'src/app/model/ArticleUtilisee';
import { Attachement } from 'src/app/model/Attachement';
import { BondeCommande } from 'src/app/model/BondeCommande';
import { ArticleRealiseeService } from 'src/app/service/article-realisee.service';
import { ArticleUtiliseeService } from 'src/app/service/article-utilisee.service';
import { ArticleService } from 'src/app/service/article.service';
import { AttachementService } from 'src/app/service/attachement.service';
import { BondeCommandeService } from 'src/app/service/bonde-commande.service';

@Component({
  selector: 'app-deeeetail-bc',
  templateUrl: './deeeetail-bc.component.html',
  styleUrls: ['./deeeetail-bc.component.css']
})
export class DeeeetailBCComponent implements OnInit {
id!:number
supArticle!:string
ModifArticle!:string
modifArticleVar=new Article()
bondeCommande!:BondeCommande
articleUtulisee!:ArticleUtilisee
listeArticlesRealisee:ArticleRealisee[]=[]
articleRealisee2=new ArticleRealisee()
articlesUtulisees!:ArticleUtilisee[]
article!:Article
article2= new Article()
code!:string
alertecodeArticle=0
desig!:string
unite!:string
listeArticles:Article[]=[]
attachement1=new Attachement()
articleRealiseef!:ArticleRealisee
articleRealisee=new ArticleRealisee()
articleRealiseeID=new ArticleRealiseeId()
attachementId!:number
reste!:number
codeArticleRealisee!:string
attachement!:Attachement
Qte!:number

articleRealiseeT=new ArticleRealisee()
notificatideCreation=0
echecCreationAttachement=0
alertAttachemnt=0
alertSuppression=0
echecSuppression=0
echecModification=0
alertModifierArticle=0
codeExisteAlerte=0
constructor( private attachementService:AttachementService,
  private artService:ArticleService,
  private articleUtuliseeService:ArticleUtiliseeService,
  private route:ActivatedRoute,
  private BCService:BondeCommandeService
  ,private articleRealService:ArticleRealiseeService) { }


  ngOnInit(): void {

    this.id=this.route.snapshot.params['id'];
    this.bondeCommande=new BondeCommande();
    this.BCService.getBCbyId(this.id).subscribe(
      data=>{
        this.bondeCommande=data;

        console.log(this.bondeCommande)
       
      }
    )
   // this.initialiserAttachementModal()

    this.trouverArticles()
  }

  remplirTableau(form:NgForm){
    let articleT=new Article()
  articleT=form.value
  for(let i=0;i<this.articlesUtulisees.length;i++){
    if(this.articlesUtulisees[i].codeArt==this.code){
      articleT.code= this.code;
      articleT.id=this.articlesUtulisees[i].id.article_id
    articleT.quantitee=this.Qte
    articleT.designation=this.article2.designation
    this.listeArticles.push(articleT)
    console.log(this.listeArticles)
    }
  }
    
  }

  onOpenDelateArticleModal(code:string):void{
  
    this.supArticle=code
    for( let i=0;i<this.listeArticles.length;i++){
      if( this.listeArticles[i].code==code){
    const container=document.getElementById('container');
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    button.setAttribute('data-target','#supprimer');
    container?.appendChild(button);
    button.click();
      }
      console.log("dans "+i+"n existe pas ")
    }
  }
SupprimerArticle(){
  this.listeArticles.forEach((curArticle) => {
    if(curArticle.code ==this.supArticle) {
     let index= this.listeArticles.findIndex(curArticle=>curArticle.code==this.supArticle)
  console.log(index)
  this.listeArticles.splice(index,1);
  this.alertSuppression=1
    }
    
  }
  );

}

updateArticleModal(code:string){
  this.ModifArticle=code
  console.log(this.ModifArticle)
  for( let i=0;i<this.listeArticles.length;i++){
    if( this.listeArticles[i].code==code){
  const container=document.getElementById('container');
  const button=document.createElement('button');
  button.type='button';
  button.style.display='none';
  button.setAttribute('data-toggle','modal');
  button.setAttribute('data-target','#Modifier');
  container?.appendChild(button);
  button.click();
    }
    console.log("dans "+i+"n existe pas ")
  }
}
ModifierForm(form:NgForm){
  this.modifArticleVar=form.value
  console.log(this.modifArticleVar)
 console.log(this.ModifArticle)
  this.listeArticles.forEach((curArticle) => {
    if(curArticle.code ==this.ModifArticle) {
     let index= this.listeArticles.findIndex(curArticle=>curArticle.code==this.ModifArticle)
     
     console.log(curArticle)
     curArticle.quantitee=this.modifArticleVar.quantitee
     this.alertModifierArticle=1
  console.log(index)
}
    
}
);
}

// partie attachement:
ajouterAttachemet(form:NgForm){

  this.attachement1=form.value
  this.attachement1.BCid=this.id

  
console.log("le code de l'attachement est "+this.attachement1.codeAttachement)
console.log("bon de commande attachement"+this.attachement1.BCid)
//test sur le champ code 
this.attachementService.getAttachementByCode(this.attachement1.codeAttachement).subscribe({
next:(response:Attachement)=>{
this.attachement=response
console.log(this.attachement)
if( this.attachement==null){
this.attachementService.addAttachement(this.attachement1,this.id).subscribe({
  next:(response:Attachement)=>{
   this.attachement=response
   this.attachementId=this.attachement.id
   console.log(this.attachement) 
   this.notificatideCreation=1
   form.reset()
   this.RemplirListeArticleRealisee();
  },

  error: (error:HttpErrorResponse) => {

   
   },
  complete: () => console.info('complete') 
  })

}
else{
this.codeExisteAlerte=1
}
},

error: (error:HttpErrorResponse) => {
this.echecCreationAttachement=1;

},
complete: () => console.info('complete') 
})



/*
this.attachementService.addAttachement(this.attachement1,this.id).subscribe({
next:(response:Attachement)=>{
this.attachement=response
this.attachementId=this.attachement.id
console.log(this.attachement) 
this.notificatideCreation=1
form.reset()
//this.notificatideCreation=0
//remplir  l id de l'article realisee
this.articleRealiseeID.attachement_id=this.attachement.id
},
error: (error:HttpErrorResponse) => {
console.log(error.message);
this.erreur=1;
},
complete: () => console.info('complete') 
})*/

}






RemplirListeArticleRealisee(){

     

  this.listeArticles.forEach((curArticle) => {

   // console.log(curArticle)
    this.articleRealiseeID.article_id=curArticle.id;
    this.articleRealiseeID.attachement_id=this.attachementId
    this.articleRealiseeT.id=this.articleRealiseeID
    this.articleRealiseeT.quantiteeRealisee=curArticle.quantitee
    console.log(this.articleRealiseeT)
   
    this.listeArticlesRealisee.push(this.articleRealiseeT)
    this.articleRealiseeT=new ArticleRealisee()
    this.articleRealiseeID=new ArticleRealiseeId()
  
})
console.log(this.listeArticlesRealisee)
console.log(this.listeArticlesRealisee.length)
 }

//Ajouter la liste des articles realisee a la base de donnée
AddListeArticesRtoBD(){
  this.listeArticlesRealisee.forEach((curArticle) => {
    console.log(curArticle.id.attachement_id,curArticle.id.article_id,curArticle.quantiteeRealisee)

    this.articleRealService.addArticleRealisee(curArticle.id.attachement_id,curArticle.id.article_id,curArticle).subscribe({
        next: (response:ArticleRealisee) =>{
         this.articleRealiseef=response
         console.log("bien")
        },
        error: (error:HttpErrorResponse) => {
          console.log(error.message);
          console.log("nnnn")
          this.alertecodeArticle=1
         // alert("vous n'etes plus attaché a une organisation")
         },
        complete: () => console.info('complete')  
      })
      console. log("liste des articles bien ajouter")
    })
   
}






//chercher code article utulisee
  recherche2(){
    for (let i=0;i<this.articlesUtulisees.length;i++){
      if(this.articlesUtulisees[i].codeArt==this.code){
        console.log("ouiiii existe")
        this.codeArticleRealisee=this.code
                //pour remplir designiation et unitee
        this.artService.getArticlebyCode(this.code).subscribe({
          next: (response:Article) =>{
           this.article=response
          
           console.log("oui il existe")
           //remplir les champ designiation et unitee
           this.article2.designation=this.article.designation
           this.article2.unitee=this.article.unitee
           this.article2.quantitee=this.articlesUtulisees[i].quantitee
           // ****
           //pour remplir  article realiseeId 
           this.articleRealiseeID.article_id=this.article.id

        
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

//////juste
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
 
 
   onOpenAddAttachementModal():void{
      const container=document.getElementById('container');
      const button=document.createElement('button');
      button.type='button';
      button.style.display='none';
      button.setAttribute('data-toggle','modal');
      button.setAttribute('data-target','#AddAttachement');
      container?.appendChild(button);
      button.click();
    

   }


  public onOpenListeArticleUtuliseeModal():void{
    const container=document.getElementById('container');
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    button.setAttribute('data-target','#getListeArticlesUtulisee');
    container?.appendChild(button);
    button.click();
  
  }/*
  //attachement
  public initialiserAttachementModal():void{
    const container=document.getElementById('container');
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    button.setAttribute('data-target','#attachement1');
    container?.appendChild(button);
    button.click();
  
  }*/




/*
//article suivant
addAraticleRealisee(form:NgForm){
 
  console.log(this.attachementId)
  if(this.attachementId==undefined){
   
    this.alertAttachemnt=1

  }else{
  console.log(this.articleRealiseeID)
  this.articleRealisee.id=this.articleRealiseeID
  console.log(this.articleRealisee.quantiteeRealisee)
  console.log("l'article realisée est :")
  console.log(this.articleRealisee)
  this.articleRealisee2.id=this.articleRealiseeID
  console.log(this.articleRealisee2.qtePlanifieee=this.article2.quantitee)
  console.log(this.articleRealisee2.quantiteeRealisee=this.articleRealisee.quantiteeRealisee)

   this.listeArticlesRealisee.push(this.articleRealisee2)
//this.listeArticlesRealisee.push({id:this.articleRealiseeID,quantiteeRealisee:this.articleRealisee.quantiteeRealisee})

    console.log("bbbbbbb"+this.articleRealisee.quantiteeRealisee)
   form.reset()
}

}
*/


// Afficher liste des articles realisees
listedesArticlesRealiseeModal():void{
  const container=document.getElementById('container');
  const button=document.createElement('button');
  button.type='button';
  button.style.display='none';
  button.setAttribute('data-toggle','modal');
  button.setAttribute('data-target','#articlesRealisee');
  container?.appendChild(button);
  button.click();


}



}
