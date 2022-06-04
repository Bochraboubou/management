import { DatePipe } from '@angular/common';
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
import { BonDeLivraisonProjet } from 'src/app/model/Bon_De_Livraison';
import { Organisation } from 'src/app/model/Organisation';
import { User } from 'src/app/model/User';
import { ArticleRealiseeService } from 'src/app/service/article-realisee.service';
import { ArticleUtiliseeService } from 'src/app/service/article-utilisee.service';
import { ArticleService } from 'src/app/service/article.service';
import { AttachementService } from 'src/app/service/attachement.service';
import { BonLivraisonProjetService } from 'src/app/service/bon-livraison-projet.service';
import { BondeCommandeService } from 'src/app/service/bonde-commande.service';
import { LoginService } from 'src/app/service/login.service';
import { OrganisationServiceService } from 'src/app/service/organisation-service.service';
import { RegisterService } from 'src/app/service/register.service';


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

attachementId!:number
reste!:number
codeArticleRealisee!:string
attachement!:Attachement
Qte!:number
alerteFirstBeAttentionAttach=1

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
ListeglobaleMat:Article[]=[]
//la somme a afficher
sommeAff=0
sommeMat=0
// afficher le div attachemnt normale 
attachementNormale=1
// pour afficher div materielle 
x=0
d:any
ListebonsDelivraison!:BonDeLivraisonProjet[]
BLstotalLength!:number

//partie materiel:::
articleMateriel=new Article()
listeMaterielUtilisee:Article[]=[]
listeMaterielRealisee:Article[]=[]
modifiable=0
alerteModification=0
modifmat!:string
supMateriel!:string
BCid!:number
constructor( private router:Router, public loginService:LoginService,private attachementService:AttachementService,
  private artService:ArticleService,
  private articleUtuliseeService:ArticleUtiliseeService,
  private route:ActivatedRoute,
  private BCService:BondeCommandeService
  ,private articleRealService:ArticleRealiseeService,private register:RegisterService,
 public organisationService:OrganisationServiceService
 ,private bondeLivraisonService:BonLivraisonProjetService,
 private datePipe: DatePipe) { }


  ngOnInit(): void {
    this.username=this.loginService.loggedUser
    this.id=this.route.snapshot.params['id'];
    this.getBondeCommande(this.id)
   // this.initialiserAttachementModal()
   this.findOrganisation(this.username);
    this.trouverArticlesUtilisee()

    // trouver la liste des materiels livrés
    this.getBonsdeLivraison(this.id)
    this.d = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
  }
   
 //récupéreu la bon de commande 
getBondeCommande(id:number){
  this.bondeCommande=new BondeCommande();
  this.BCService.getBCbyId(this.id).subscribe(
    data=>{
      this.bondeCommande=data;
     this. BCid=this.bondeCommande.id
      console.log(this.bondeCommande)
     
    }
  )
}
 //find list of used article
 //////juste
//trouver les article de la bon de commande 
trouverArticlesUtilisee(){
  this.articleUtuliseeService.getArticlesUtiliseesbyBC(this.id).subscribe({
   next: (response:ArticleUtilisee[]) => {
     this.articlesUtulisees=response;
     console .log( "la liste des article utilisee est" +this.articlesUtulisees)
     console.log(this.articlesUtulisees)

     for( let i=0;i<this.articlesUtulisees.length;i++){
     
       this.trouvercode(this.articlesUtulisees[i]);
       //console.log(a)


     }
     },
       error: (error:HttpErrorResponse) => {
         console.log(error.message);
        
        },
       complete: () => console.info('complete') 
     })
 }

 trouvercode(artUtl:ArticleUtilisee) {
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
      console .log ( this.article)
     
}
 

//chercher par code article 
recherche2(addattachement:NgForm){
  let res=""
  // artUltulTab: article utilisé dans tab
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
    addattachement.reset()
  }
 else{
  this.listeArticles.forEach((curArticle) => {
    if(curArticle.code ==this.code) {
      this.modifiable=1
 
    }
  })
 } 


if(this.modifiable==1){

this.alerteModification=1
this.modifiable=0
}
else{ 
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
this.somDesArticles(this.BCid);
//remplir les champ designiation et unitee
this.article2.designation=this.article.designation
this.article2.unitee=this.article.unitee



},
error: (error:HttpErrorResponse) => {
console.log(error.message);
this.alertecodeArticle=1

},
complete: () => console.info('complete')  
})

  }
}

somDesArticles(bcId:number){
  let somme=0
 this.attachementService.AttachementByBCommande(bcId).subscribe({
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
    let articleDansTab=new Article()
  articleDansTab=form.value
  for(let i=0;i<this.articlesUtulisees.length;i++){
    if(this.articlesUtulisees[i].codeArt==this.code){
      articleDansTab.code= this.code;
      articleDansTab.id=this.articlesUtulisees[i].id.article_id
      articleDansTab.quantitee=this.Qte
      articleDansTab.designation=this.article2.designation
    this.listeArticles.push(articleDansTab)
    form.reset()
   this. articleAjouter=1;
    console.log(this.listeArticles)
    }
  }
    
  }

  onOpenDelateArticleModal(code:string):void{
  
    this.supArticle=code
    console.log(code)
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
  complete: () =>  console.info('complete') 
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

}

RemplirListeArticleRealisee(){

     

  this.listeArticles.forEach((curArticle) => {
   let  articleRealisee=new ArticleRealisee()
   let articleRealiseeID=new ArticleRealiseeId()
   // console.log(curArticle)
    articleRealiseeID.article_id=curArticle.id;
    articleRealiseeID.attachement_id=this.attachementId
    articleRealisee.id=articleRealiseeID
    articleRealisee.quantiteeRealisee=curArticle.quantitee
    
   
    this.listeArticlesRealisee.push(articleRealisee)
 
})
this.adddToGlobalListe();
console.log(this.listeArticlesRealisee)
console.log(this.listeArticlesRealisee.length)


  this.AddListeArticesRtoBD();
 }

adddToGlobalListe(){
  //ajouter materiel:
this. listeMaterielRealisee.forEach((curArticle) => {
  // autre méthode pour stocker l article realisee
  let materielRealisee=new ArticleRealisee()
 let MaterielRaliseeID=new ArticleRealiseeId() 
 //remplir id
 MaterielRaliseeID.article_id=curArticle.id;
 MaterielRaliseeID.attachement_id=this.attachementId
 // remplir l'article realisee
 materielRealisee.id=MaterielRaliseeID
 materielRealisee.quantiteeRealisee=curArticle.quantitee
 this.listeArticlesRealisee.push(materielRealisee)

})

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
         
         },
        complete: () => console.info('complete')  
     
      })
      console. log("liste des articles bien ajouter")
  
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
//
//
//
//
// partie attachement materiel 

openListeMateriel(){
  const container=document.getElementById('container');
  const button=document.createElement('button');
  button.type='button';
  button.style.display='none';
  button.setAttribute('data-toggle','modal');
  button.setAttribute('data-target','#materielsDansBL');
  container?.appendChild(button);
  button.click();
}
openListeMaterielRealisee(){
  const container=document.getElementById('container');
  const button=document.createElement('button');
  button.type='button';
  button.style.display='none';
  button.setAttribute('data-toggle','modal');
  button.setAttribute('data-target','#materielRealiseeDansAttach');
  container?.appendChild(button);
  button.click();
}

attachemenMateriel( form:NgForm){
  alert("Vous etes dans l'interface attachement materielle")
  // afficher le div attachemnt normale 
  this.attachementNormale=0
// pour afficher div materielle 
this.x=1
form.reset()

}
attachementNormaleONN(attachementMateriel:NgForm){
  alert("Vous etes dans l'interface attachement normale  ")
  // afficher le div attachemnt normale 
  this.attachementNormale=1
// pour afficher div materielle 
this.x=0
attachementMateriel.reset()
}
// une bon de commande contient plusieurs bl
//chaque bl contient plusieur article :

// trouver tous les articles de type materielle de cette bon de commande 

  //recuperer les bon de livraison du BC choisis
  public getBonsdeLivraison(idBC:number):void{
    this.bondeLivraisonService.getAllbonsdelivraisonsBybcId(idBC).subscribe({
     next: (response:BonDeLivraisonProjet[]) =>{
       this.ListebonsDelivraison=response;
       for (let i = 0; i < this.ListebonsDelivraison.length; i++) {
        this.getMaterielslivrés(this.ListebonsDelivraison[i]);
      }
       this.BLstotalLength = response.length;
       console.log("bons de livraison du BC choisis "+this.bondeCommande?.codebc+" sont les suivants"+this.ListebonsDelivraison);
       
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
       for (let i = 0; i <  BL.listeMateriel.length; i++) {
          this.ListeglobaleMat.push(BL.listeMateriel[i])
       }
       console.log("get materiel du BL"+BL.codeBonLivraisonProj);
       
     },
     error: (error:HttpErrorResponse) => {
       alert(error.message);

      },
    complete: () => console.info('get materiels by BL complete') 
 })  

 }
 /*

// similaire au somme des article 
 SommUtilisationMateriel(){
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
          this.sommeMat=somme
        
         },
         error: (error:HttpErrorResponse) => {
           console.log(error.message);
          },
         complete: () => console.info('complete')
     })




     })
      
       
   
   },
   error: (error:HttpErrorResponse) => {
     console.log(error.message);

    },
   complete: () => console.info('complete') 
 })
}*/

 // chercher le code du materiel
 cherchermateriel(addForm:NgForm){
 
  let res=""
  //let artUltulTab=new ArticleUtilisee()
  console.log(this.code)
  for (let i=0;i<this.ListeglobaleMat.length;i++){
  console.log(this.ListeglobaleMat[i].code)
   if(this.ListeglobaleMat[i].code==this.code)   {
    res=res+this.ListeglobaleMat[i].code
   }
   }
   if(res=="")
   {
    this.alertecodeArticle=1
    addForm.reset()

  }
  else{
    this.listeMaterielRealisee.forEach((curArticle) => {
      if(curArticle.code ==this.code) {
        this.modifiable=1
   
      }
    })}

if(this.modifiable==1){

  this.alerteModification=1
  this.modifiable=0
}
 else{ 

          this.artService.getArticlebyCode(this.code).subscribe({
            next: (response:Article) =>{
             this.article=response
             console.log(this.article)
             this.article2.id=this.article.id
             this.article2.code=this.article.code
          this.article2.designation=this.article.designation
             this.article2.unitee=this.article.unitee
             this.artID=this.article.id 
             this.somDesArticles(this.BCid);
             console.log(this.sommeMat)
           
             
      },
      error: (error:HttpErrorResponse) => {
        console.log(error.message);
        this.alertecodeArticle=1
       
       },
      complete: () => console.info('complete')  
      })
        
    
    }
  

 }
// remplir le tableau par les materiel realiseee dans l 'attachement
addMateriel(addf:NgForm){
  // console.log(this.article2)
   let article3=addf.value
  
 console.log(this.article2)
 
 let articleSauvgarder=new Article()
 articleSauvgarder.id=this.article2.id
 articleSauvgarder.code=this.article2.code
 articleSauvgarder.designation=article3.designation
 articleSauvgarder.unitee=article3.unitee
 articleSauvgarder.prix=article3.prix
 articleSauvgarder.quantitee=this.Qte
 console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
 console.log(articleSauvgarder)
 
 this.listeMaterielRealisee.push(articleSauvgarder)
 
 this.articleAjouter=1
 addf.reset()

 
 }


 onOpenDelateMaterielModal(code:string):void{
  
  this.supMateriel=code
  for( let i=0;i<this.listeMaterielRealisee.length;i++){
    if( this.listeMaterielRealisee[i].code==code){
  const container=document.getElementById('container');
  const button=document.createElement('button');
  button.type='button' ;
  button.style.display='none' ;
  button.setAttribute('data-toggle','modal') ;
  button.setAttribute('data-target','#supprimerMateriel');
  container?.appendChild(button);
  button.click();
    }
    console.log("dans "+i+"n existe pas ")
  }
}
SupprimerMateriel(){
  console.log("suuuuuuuuuuup")
this.listeMaterielRealisee.forEach((curArticle) => {
  if(curArticle.code ==this.supMateriel) {
   let index= this.listeMaterielRealisee.findIndex(curArticle=>curArticle.code==this.supMateriel)
console.log(index)
this.listeMaterielRealisee.splice(index,1);
this.alertSuppression=1
  }
  
}
);

}

updateMaterieleModal(code:string){
  this.modifmat=code
console.log(this.modifmat)
for( let i=0;i<this.listeMaterielRealisee.length;i++){
  if( this.listeMaterielRealisee[i].code==code){
    
const container=document.getElementById('container');
const button=document.createElement('button');
button.type='button';
button.style.display='none';
button.setAttribute('data-toggle','modal');
button.setAttribute('data-target','#ModifierMateriel');
container?.appendChild(button);
button.click();
  }
  console.log("dans "+i+"n existe pas ")
}
}
ModifierMateriel(form:NgForm){
this.modifArticleVar=form.value
console.log(this.modifArticleVar)
console.log(this.modifmat)
this.listeMaterielRealisee.forEach((curArticle) => {
  if(curArticle.code ==this.modifmat) {
   let index= this.listeMaterielRealisee.findIndex(curArticle=>curArticle.code==this.modifmat)
   
   console.log(curArticle)
   curArticle.quantitee=this.modifArticleVar.quantitee
   this.alertModifierArticle=1
console.log(index)
}
else(
  alert("erreur de modification")
)
  
}
);
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
  this.alerteModification=0
}

}
