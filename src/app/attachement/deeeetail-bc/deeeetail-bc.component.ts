import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/model/Article';
import { ArticleRealisee } from 'src/app/model/ArticleRealisee';
import { ArticleRealiseeId } from 'src/app/model/ArticleRealiseeId';
import { ArticleUtilisee } from 'src/app/model/ArticleUtilisee';
import { Attachement } from 'src/app/model/Attachement';
import { BondeCommande } from 'src/app/model/BondeCommande';
import { Organisation } from 'src/app/model/Organisation';
import { User } from 'src/app/model/User';
import { ArticleRealiseeService } from 'src/app/service/article-realisee.service';
import { ArticleUtiliseeService } from 'src/app/service/article-utilisee.service';
import { ArticleService } from 'src/app/service/article.service';
import { AttachementService } from 'src/app/service/attachement.service';
import { BondeCommandeService } from 'src/app/service/bonde-commande.service';
import { LoginService } from 'src/app/service/login.service';
import { OrganisationServiceService } from 'src/app/service/organisation-service.service';
import { RegisterService } from 'src/app/service/register.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-deeeetail-bc',
  templateUrl: './deeeetail-bc.component.html',
  styleUrls: ['./deeeetail-bc.component.css']
})
export class DeeeetailBCComponent implements OnInit {
id!:number
username!:string
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
date=new Date()
alertecodeArticle=0
desig!:string
existe="";
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
articleAjouter=0;
alertAttachementExiste=0
user!:User
organisation!:Organisation
idOrgan!:number
attachementliste!:Attachement[]
listeArtR!:ArticleRealisee[]
artID!:number
//la somme a afficher
sommeAff!:number
constructor( private router:Router, public loginService:LoginService,private attachementService:AttachementService,
  private artService:ArticleService,
  private articleUtuliseeService:ArticleUtiliseeService,
  private route:ActivatedRoute,
  private BCService:BondeCommandeService
  ,private articleRealService:ArticleRealiseeService,private register:RegisterService,
 public organisationService:OrganisationServiceService) { }


  ngOnInit(): void {
    this.username=this.loginService.loggedUser
    this.id=this.route.snapshot.params['id'];
    this.bondeCommande=new BondeCommande();
    this.BCService.getBCbyId(this.id).subscribe(
      data=>{
        this.bondeCommande=data;

        console.log(this.bondeCommande)
       
      }
    )
   // this.initialiserAttachementModal()
   this.findOrganisation(this.username);
    this.trouverArticles()
  }

sumDesArticles(){
   let somme=0
  this.attachementService.getAllAttachement().subscribe({
    next: (response:Attachement[]) => {
      this.attachementliste=response
      console.log(this.attachementliste )

      this.attachementliste.forEach((curAttachement) => {
        this.articleRealService.findARbyAttId(curAttachement.id).subscribe({
          next: (response:ArticleRealisee[]) => {
           // liste des articles realiséee
            this.listeArtR=response
            console.log("aaa")
            console.log(this.listeArtR)
// parcourir la liste 
           this.listeArtR.forEach((currAricleR) => {
                         if (currAricleR.id.article_id==this.artID){
                           somme=somme+currAricleR.quantiteeRealisee
                         }


           })
           console.log("la somme est :")
           console.log(somme)
           this.sommeAff=somme
         
          },
          error: (error:HttpErrorResponse) => {
            console.log(error.message);
           },
          complete: () => console.info('complete')
      })



//end for
      })
       
        
    
    },
    error: (error:HttpErrorResponse) => {
      console.log(error.message);

     },
    complete: () => console.info('complete') 
  })
}














  verifier(){

     console.log("imprimer")

    if(this.existe==""){
      this.alertAttachementExiste=1

    }
    else{
      this.openImprimerModal();
    }
  }
  findOrganisation(username:string){
    this.register.findByUserName(this.username).subscribe(
      data=>{
        this.user=data;
        this.organisationService.getOrganisationbyUser(this.user.id).subscribe({
          next: (response:Organisation) => {
            this.organisation=response;
            console.log("organisation"+response);
            this.idOrgan=this.organisation.id;
            console.log(this.organisation.id)
          },
          error: (error:HttpErrorResponse) => {
            console.log(error.message);
           // alert("vous n'etes plus attaché a une organisation")
           },
          complete: () => console.info('complete') 
        })
     }
    )
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
    form.reset()
   this. articleAjouter=1;
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
   this.existe="nn"
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
  this.AddListeArticesRtoBD();
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
    let res=""
    let artUltulTab=new ArticleUtilisee()
    for (let i=0;i<this.articlesUtulisees.length;i++){
      if(this.articlesUtulisees[i].codeArt==this.code){
        res=this.articlesUtulisees[i].codeArt
        // stocker du id de l'article courante

       
        artUltulTab=this.articlesUtulisees[i]
    }}

    //res contient le code de l'article 
    // un test sur res si elle est vide donc code n'existe pas snn oui existe 
    if(res==""){
      this.alertecodeArticle=1 
    }else{
      console.log(" code existe")

      this.codeArticleRealisee=this.code
      //pour remplir designiation et unitee
this.artService.getArticlebyCode(this.code).subscribe({
next: (response:Article) =>{
 this.article=response
 // stocker l id de l article dans artID
 this.artID=this.article.id
//
//remplir le champ  quantite realisee dans les autres attachement 
this.sumDesArticles();
 //remplir les champ designiation et unitee
 this.article2.designation=this.article.designation
 this.article2.unitee=this.article.unitee
 this.article2.quantitee=artUltulTab.quantitee
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
  }

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

openImprimerModal(){
  const container=document.getElementById('container');
  const button=document.createElement('button');
  button.type='button';
  button.style.display='none';
  button.setAttribute('data-toggle','modal');
  button.setAttribute('data-target','#imprimer');
  container?.appendChild(button);
  button.click();
}
closeAlerts(){
  this.notificatideCreation=0
this.echecCreationAttachement=0
this.alertAttachemnt=0
this.alertSuppression=0
this.echecSuppression=0
this.echecModification=0
this.alertModifierArticle=0
this.codeExisteAlerte=0
  this.alertecodeArticle=0
  this.articleAjouter=0;
  this.alertAttachementExiste=0
}

}
