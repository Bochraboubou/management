import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Article } from 'src/app/model/Article';
import { BonDeLivraisonMC } from 'src/app/model/Bon_De_livraisonMC';
import { Metier } from 'src/app/model/Metier';
import { MLiivMcId } from 'src/app/model/MLiivMcId';
import { MLivMC } from 'src/app/model/MLivMC';
import { OrdreDeTraveaux } from 'src/app/model/OrdreDeTraveaux';
import { Organisation } from 'src/app/model/Organisation';
import { User } from 'src/app/model/User';
import { ArticleService } from 'src/app/service/article.service';
import { BonLivraisonMCService } from 'src/app/service/bon-livraison-mc.service';
import { LoginService } from 'src/app/service/login.service';
import { MateriellivreeMCadreService } from 'src/app/service/materiellivree-mcadre.service';
import { MetierService } from 'src/app/service/metier.service';
import { OrdreDeTraveauxService } from 'src/app/service/ordre-de-traveaux.service';
import { OrganisationServiceService } from 'src/app/service/organisation-service.service';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-ajouter-blma-c',
  templateUrl: './ajouter-blma-c.component.html',
  styleUrls: ['./ajouter-blma-c.component.css']
})
export class AjouterBLmaCComponent implements OnInit {
OT!:OrdreDeTraveaux
metier!:Metier
listeArticles!:Article[]
listeMaterielLivree: Article[]=[]
bondeLivraisonMC=new  BonDeLivraisonMC()
Somme=0
Reste=0
codeBL!:string;
dateSystNewBL!:Date
datalivraisonNewBL!:Date
montantBL!:0
code!:string
d1=new Date()
article!:Article
article2=new Article()
supArticle!:string
ModifArticle!:string
modifArticleVar=new Article()
bonLivrai2!:BonDeLivraisonMC
terme:any;
page:number = 1;
totalLength:any;
username!:string
organisation= new Organisation()
idOrgan!:number
user!:User
existe=""
// alertes
alertCreerBL=0
alertecodeArticle=0
alertCodeBL=0
alertSUCCEE=0
modifiable=0
alerteModification=0
alerteMontantSuperieur=0
articleAjouter=0
alertSuppression=0
alertModifierArticle=0
alertDernierVerif=0
echecSuppression=0
echecModification=0
alertBLtExiste=0
// ne sont pas des alertes 
boutonAjouter=0
nouvelleInterface=0
boutonValider=0
transparent=0
y=0
  constructor(private register:RegisterService,public organisationService:OrganisationServiceService, public loginService:LoginService,private materielMCservice: MateriellivreeMCadreService,private blMCService :BonLivraisonMCService,private artService:ArticleService,private metierService:MetierService,private ordreDeTraveauService:OrdreDeTraveauxService, ) { }

  ngOnInit(): void {
    this.username=this.loginService.loggedUser
    this.findOrganisation(this.username)
    let OTid=1 
    let m_id=1
    this.trouverOT(OTid)
    this.getMetier(m_id);
    this.SommeArticles()
  

  }
   
 
  trouverOT(id:number){
    
    this.ordreDeTraveauService.getOrdreDeTraveauById(id).subscribe({
      
     next: (response:OrdreDeTraveaux) => {
       this.OT=response
   },
    error: (error:HttpErrorResponse) => {
      console.log(error.message);
   
     },
    complete: () => console.info('complete') 
   })
  }
  //trouver métier
  getMetier(id:number){
    this.metierService.getMetierbyId(id).subscribe({
     
      next: (response:Metier) => {
         this.metier=response
         this.getAllMaterielArticles(id);
     },
      error: (error:HttpErrorResponse) => {
        console.log(error.message);
     
       },
      complete: () => console.info('complete') 
    })

  }
  
 //trouver tous les articles de type "materiel en régie" dans une métier
getAllMaterielArticles(id:number){
  this.artService.getArticleTMatbyMetierId(id).subscribe({
    next: (response:Article[]) => {
      this.listeArticles=response
     
  },
   error: (error:HttpErrorResponse) => {
     console.log(error.message);
  
    },
   complete: () => console.info('complete') 
 })
}

onOpenAddBLMoale():void{
  const container=document.getElementById('container');
  const button=document.createElement('button');
  button.type='button';
  button.style.display='none';
  button.setAttribute('data-toggle','modal');
  button.setAttribute('data-target','#ajouterBL');
  container?.appendChild(button);
  button.click();
}
onOpenChercherArticleMoale():void{
  const container=document.getElementById('container');
  const button=document.createElement('button');
  button.type='button';
  button.style.display='none';
  button.setAttribute('data-toggle','modal');
  button.setAttribute('data-target','#chercherArticles');
  container?.appendChild(button);
  button.click();
}
onOpenListeRealiseeModal():void{
  const container=document.getElementById('container');
  const button=document.createElement('button');
  button.type='button';
  button.style.display='none';
  button.setAttribute('data-toggle','modal');
  button.setAttribute('data-target','#listeRealisee');
  container?.appendChild(button);
  button.click();
}
// initiallement on cree une bon de BL qui contient un montant ...
//pour ensuite si elle est valide on stoke cette bl
createNewBL(addBLForm:NgForm){
  console.log(addBLForm.value.codeBL)
 //test code existe #
let blMtest=new BonDeLivraisonMC()
this.blMCService.getBLMCbyCode(addBLForm.value.codeBL).subscribe({
  next: (response:BonDeLivraisonMC) =>{
    blMtest=response 
    console.log(blMtest)
   if( blMtest==null){
     this.boutonAjouter=1
    this. alertCreerBL=1
 this.SommeArticles()
 this.y=1
    this.bondeLivraisonMC.codeBonLivraisonMC=this.codeBL
    this.bondeLivraisonMC.dateSystemeBLMC=this.d1
    this.bondeLivraisonMC.dateLivraisonBLMC=this.datalivraisonNewBL
    this.bondeLivraisonMC.montantBL=this.montantBL
   }
   else{
    this.alertCodeBL=1
    
   }
  },

  error: (error:HttpErrorResponse) => {
  console.log(error.message);
  this.alertecodeArticle=1
   // alert("vous n'etes plus attaché a une organisation")
   },
  complete: () => console.info('complete')  
  })

}

SommeArticles(){
  this.Somme=0
  this.Reste=0
  this.listeMaterielLivree.forEach((curArticle) => {
    this.Somme=this.Somme+(curArticle.quantitee * curArticle.prix)
    
  })
  this.Reste= this.bondeLivraisonMC.montantBL- this.Somme
  
  }
//chercher code article utulisee
recherche2(){
  let res=""
  //let artUltulTab=new ArticleUtilisee()
  console.log(this.code)
  for (let i=0;i<this.listeArticles.length;i++){
  console.log(this.listeArticles[i].code)
   if(this.listeArticles[i].code==this.code)   {
    res=res+this.listeArticles[i].code
   }
   }
   if(res=="")
   {
    this.alertecodeArticle=1
  }
  else{
    this.listeMaterielLivree.forEach((curArticle) => {
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
              // article 2  est un objet où je vais stoker id, qdes, unitee , code , par suite je complete  qte et prix dans une autre article . et enfin je concatine les deux 
             this.article=response
             console.log(this.article)
             this.article2.id=this.article.id
             this.article2.code=this.article.code
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
  //remplir le tableau des article realisee
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
 articleSauvgarder.quantitee=article3.quantitee
 console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
 console.log(articleSauvgarder)
 let somme22=this.Somme+(articleSauvgarder.prix *articleSauvgarder.quantitee )
 console.log(somme22)
 if(somme22 >this.bondeLivraisonMC.montantBL){
   this.alerteMontantSuperieur=1
 }else{
 this.listeMaterielLivree.push(articleSauvgarder)
 this.SommeArticles()
 this.articleAjouter=1
 addf.reset()
 }
 if(this.Somme==this.bondeLivraisonMC.montantBL){
   this.boutonValider=1
 }
 }
 
 onOpenDelateArticleModal(code:string):void{
   
   this.supArticle=code
   for( let i=0;i<this.listeMaterielLivree.length;i++){
     if( this.listeMaterielLivree[i].code==code){
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
  this.listeMaterielLivree.forEach((curArticle) => {
    if(curArticle.code ==this.supArticle) {
     let index= this.listeMaterielLivree.findIndex(curArticle=>curArticle.code==this.supArticle)
  console.log(index)
  this.listeMaterielLivree.splice(index,1);
  this.alertSuppression=1
    }
    
  }
  );
  this.SommeArticles()
}

updateArticleModal(code:string){
  this.ModifArticle=code
  console.log(this.ModifArticle)
  for( let i=0;i<this.listeMaterielLivree.length;i++){
    if( this.listeMaterielLivree[i].code==code){
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
  this.listeMaterielLivree.forEach((curArticle) => {
    if(curArticle.code ==this.ModifArticle) {
     let index= this.listeMaterielLivree.findIndex(curArticle=>curArticle.code==this.ModifArticle)
     
     console.log(curArticle)
     curArticle.quantitee=this.modifArticleVar.quantitee
     curArticle.prix=this.modifArticleVar.prix
     this.alertModifierArticle=1
     form.reset()
  console.log(index)
}
    
}
);
this.SommeArticles()
}

EnregistrerBL(){
  let OTid=this.OT.id
  console.log(this.bondeLivraisonMC)
  if(this.bondeLivraisonMC.montantBL==this.Somme){
    //add bl p
   this.blMCService.addblMC(this.bondeLivraisonMC,OTid).subscribe({
   next: (response:BonDeLivraisonMC) =>{
     this.bonLivrai2=response
    this. existe="aa"
     console.log(this.bonLivrai2)
     console.log("bien")
   
     console.log(this.bonLivrai2.id)
     let Blid=this.bonLivrai2.id
     this.SaveMateriel(Blid)
 
    },
    error: (error:HttpErrorResponse) => {
      console.log(error.message);
      console.log("nnnn")
      this.alertecodeArticle=1
    
     },
    complete: () => console.info('complete')  
  })
  }
  else{
  this. alertDernierVerif=1
  }
 //
 
 }
 // stoker la liste des materiels livree dans la  base de donnee
// dans ce componenet j'ai travailler avec deux article a partir de la premiere j'obtient l 'id et le code de l'article et a partir de la deuxieme(formulaire)j'obtient la qte et le prix 

SaveMateriel(blid:number){
  let materielLivreeID=new MLiivMcId()
  materielLivreeID.BonLivraisonMC_id=blid
  this.listeMaterielLivree.forEach((curArticle) => {
    console.log(curArticle)
    // new materielLivreeID:pour stocker l id du materielle que je veux stocker
  let materielLivreeID=new MLiivMcId()
//par defaut(a partir du parametre) 
   materielLivreeID.BonLivraisonMC_id=blid
  materielLivreeID.article_id=curArticle.id
  // creation d'un objet materiel livree 
let materielLivree =new MLivMC()
  materielLivree.id=materielLivreeID
  materielLivree.prix=curArticle.prix
  materielLivree.quantiteeLivreeMC=curArticle.quantitee
  console.log(materielLivree)
this.materielMCservice.addMaterielMC(blid,curArticle.id,materielLivree).subscribe({
  next: (response:MLivMC) =>{
    console.log("ajouterrr")
   this.alertSUCCEE=1
   this.nouvelleInterface=1
   this.boutonValider=0

   },
   error: (error:HttpErrorResponse) => {
     console.log(error.message);
     console.log("nnnn")
     
    // alert("vous n'etes plus attaché a une organisation")
    },
   complete: () => console.info('complete')  
 })

 })
 console.log(" tous les articles sont ajouter") 
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
verif(){

  console.log("imprimer")
 

 if(this.existe==""){
   this.alertBLtExiste=1

 }
 else{
   this.openImprimerModal();
 }
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
  this.alertecodeArticle=0
  this. alertCreerBL=0
  this.alertCodeBL=0
  this.alertSUCCEE=0
  this.alerteModification=0
  this.alerteMontantSuperieur=0
  this.articleAjouter=0
  this.alertSuppression=0
  this.alertModifierArticle=0
  this. alertDernierVerif=0
  this.echecSuppression=0
  this.echecModification=0
  this.alertBLtExiste=0
}
}
