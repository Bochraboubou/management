import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Article } from 'src/app/model/Article';
import { BondeCommande } from 'src/app/model/BondeCommande';
import { BonDeLivraisonProjet } from 'src/app/model/Bon_De_Livraison';
import { MatLivMProjetId } from 'src/app/model/MatlivMProjId';
import { Metier } from 'src/app/model/Metier';
import { MLivProj } from 'src/app/model/MLivProj';
import { ArticleService } from 'src/app/service/article.service';
import { BonLivraisonProjetService } from 'src/app/service/bon-livraison-projet.service';
import { BondeCommandeService } from 'src/app/service/bonde-commande.service';
import { MateriellivreeProjetService } from 'src/app/service/materiellivree-projet.service';
import { MetierService } from 'src/app/service/metier.service';

@Component({
  selector: 'app-ajouter-blm-projet',
  templateUrl: './ajouter-blm-projet.component.html',
  styleUrls: ['./ajouter-blm-projet.component.css']
})
export class AjouterBlmProjetComponent implements OnInit {
  terme:any;
  page:number = 1;
  totalLength:any;
bondeCommande!:BondeCommande
metier!:Metier
listeArticles!: Article[]
listeMaterielLivree: Article[]=[]
x=0
y=0
codeBL!:string;
dateSystNewBL!:Date
datalivraisonNewBL!:Date
montantBL!:0
code!:string
alertecodeArticle=0
// partie materielle
materielLivreeProj=new MLivProj()
materielleLivreeProjId=new MatLivMProjetId()
article!:Article
article2=new Article()
alertModifierArticle=0
echecModification=0
echecSuppression=0
modifArticleVar=new Article()
bondeLivraisonMp=new  BonDeLivraisonProjet()
supArticle!:string
ModifArticle!:string
alertSuppression=0
alerteModification=0
alertDernierVerif=0
alertSUCCEE=0
modifiable=0
montantDesArticles!:0
Somme!:number
Reste!:number
alerteMontantSuperieur=0
articleAjouter=0
boutonValider=0
boutonAjouter=0
nouvelleInterface=0
d1=new Date()
bonLivrai2!:BonDeLivraisonProjet
  constructor(  private materielLivreeProjService:MateriellivreeProjetService, private blPService:BonLivraisonProjetService, private artService:ArticleService,private bonCommandeService:BondeCommandeService,  private metierService:MetierService) { }

  ngOnInit(): void {
    let Bc_id=1
    let met_id=1
    this.getBonDeCommande(Bc_id);
    this.getMetier(met_id)
    this.SommeArticles()

  }
 
SommeArticles(){
this.Somme=0
this.Reste=0
this.listeMaterielLivree.forEach((curArticle) => {
  this.Somme=this.Somme+(curArticle.quantitee * curArticle.prix)
  
})
this.Reste= this.bondeLivraisonMp.montantBL- this.Somme

}
  getBonDeCommande(id:number){
    this.bonCommandeService.getBCbyId(id).subscribe({
     
      next: (response:BondeCommande) => {
         this.bondeCommande=response
     },
      error: (error:HttpErrorResponse) => {
        console.log(error.message);
     
       },
      complete: () => console.info('complete') 
    })

  }
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
// initiallement on cree une bon de commande qui contient un montant ...
//pour ensuite si elle est valide on stoke cette bl
createNewBL(addBLForm:NgForm){
 

//test code existe #
let blpTest=new BonDeLivraisonProjet()
this.blPService.getBLbyCode(this.codeBL).subscribe({
  next: (response:BonDeLivraisonProjet) =>{
    blpTest=response 
   if( blpTest==null){
    this.bondeLivraisonMp.codeBonLivraisonProj=this.codeBL
    this.bondeLivraisonMp.dateSystemeBLProj=this.d1
    this.bondeLivraisonMp.dateLivraisonBLProj=this.datalivraisonNewBL
    this.bondeLivraisonMp.montantBL=this.montantBL
   }
   else{
    addBLForm.reset()
    alert("attt")
   }
  },
  error: (error:HttpErrorResponse) => {
    console.log(error.message);
    this.alertecodeArticle=1
   // alert("vous n'etes plus attaché a une organisation")
   },
  complete: () => console.info('complete')  
  })


 this.boutonAjouter=1
 this.SommeArticles()

 this.y=1

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
        
       // alert("modifiable")
      }
    })}

if(this.modifiable==1){
  //alert("modifiable")
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
            // this.article2.quantitee=artUltulTab.quantitee
             
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
if(somme22 >this.bondeLivraisonMp.montantBL){
  this.alerteMontantSuperieur=1
}else{
this.listeMaterielLivree.push(articleSauvgarder)
this.SommeArticles()
this.articleAjouter=1
addf.reset()
}
if(this.Somme==this.bondeLivraisonMp.montantBL){
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
     this.alertModifierArticle=1
     form.reset()
  console.log(index)
}
    
}
);
this.SommeArticles()
}

EnregistrerBL(){
 let bcId=this.bondeCommande.id
 console.log(this.bondeLivraisonMp)
 if(this.bondeLivraisonMp.montantBL==this.Somme){
   //add bl p
  this.blPService.addBLProjet(this.bondeLivraisonMp,bcId).subscribe({
  next: (response:BonDeLivraisonProjet) =>{
    this.bonLivrai2=response
    console.log(this.bonLivrai2)
    console.log("bien")
    alert("biiien")
    console.log(this.bonLivrai2.bl_id)
    let Blid=this.bonLivrai2.bl_id
    this.SaveMateriel(Blid)

   },
   error: (error:HttpErrorResponse) => {
     console.log(error.message);
     console.log("nnnn")
     this.alertecodeArticle=1
    // alert("vous n'etes plus attaché a une organisation")
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
  let materielLivreeID=new MatLivMProjetId()
  materielLivreeID.BonLivraisonMP_id=blid
  this.listeMaterielLivree.forEach((curArticle) => {
    console.log(curArticle)
    // new materielLivreeID:pour stocker l id du materielle que je veux stocker
  let materielLivreeID=new MatLivMProjetId()
//par defaut(a partir du parametre) 
   materielLivreeID.BonLivraisonMP_id=blid
  materielLivreeID.article_id=curArticle.id
  // creation d'un objet materiel livree 
let materielLivree =new MLivProj()
  materielLivree.id=materielLivreeID
  materielLivree.prix=curArticle.prix
  materielLivree.quantiteeLivree=curArticle.quantitee
  console.log(materielLivree)
this.materielLivreeProjService.addMaterielProjet(blid,curArticle.id,materielLivree).subscribe({
  next: (response:MLivProj) =>{
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



  closeAlerts(){
    this.alertSuppression=0
    this.alerteModification=0
    this. alertModifierArticle=0
    this.echecModification=0
    this.echecSuppression=0
    this.alertecodeArticle=0
    this.alerteMontantSuperieur=0
    this.articleAjouter=0
    this. alertDernierVerif=0
    this.alertSUCCEE=0
  }
}
