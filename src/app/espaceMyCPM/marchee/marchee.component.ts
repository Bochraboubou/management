import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Article } from 'src/app/model/Article';
import { ArticleUtilisee } from 'src/app/model/ArticleUtilisee';
import { ArticleUtiliseeId } from 'src/app/model/ArticleUtiliseeId';
import { BondeCommande } from 'src/app/model/BondeCommande';
import { Marchee } from 'src/app/model/Marchee';
import { Metier } from 'src/app/model/Metier';
import { Organisation } from 'src/app/model/Organisation';
import { Secteur } from 'src/app/model/Secteur';
import { ArticleUtiliseeService } from 'src/app/service/article-utilisee.service';
import { ArticleService } from 'src/app/service/article.service';
import { BondeCommandeService } from 'src/app/service/bonde-commande.service';
import { EntrepriseServiceService } from 'src/app/service/entreprise-service.service';
import { MarcheeService } from 'src/app/service/marchee.service';
import { MetierService } from 'src/app/service/metier.service';
import { OrganisationServiceService } from 'src/app/service/organisation-service.service';
import { SecteurService } from 'src/app/service/secteur.service';
import { ArticlespecifieeComponent } from '../articlespecifiee/articlespecifiee.component';

@Component({
  selector: 'app-marchee',
  templateUrl: './marchee.component.html',
  styleUrls: ['./marchee.component.css']
})
export class MarcheeComponent implements OnInit {
  metiers!: Metier[];
  idOrgan:number=2;
  idSecteur!: number;
  idEntreprise!: number;
  idMarchee!: number;
  showExistMarcheeAlert:boolean=false;
  successMarchee:boolean=false;
  idEntrepriseBc!: number;
  entreprise!: Organisation;
  bondeCommande!: BondeCommande;
  secteurs!: Secteur[];
  idMetier!: number;
  alerteCodeInexistant:boolean=false;
  codeEntreprise!: string;
  newMarchee: Marchee= new Marchee();
  //newBC=new BondeCommande();
  indiceBC!: number;
  montantArticles:number= 0;
  montantNewBC!: number;
  delaisNewBC!: number;
  newArticle:Article= new Article();
  alerteCodeArticleIncorrecte:boolean=false;
  codeArticle!: string;
  alerteTotalArticles:boolean=false;
  alerteMontantBCs:boolean=false;
  alerteDelaisBCs:boolean=false;
  idBondeCommande!: number;
  

  

 
  
 
 
  




  constructor(private organService:OrganisationServiceService,private secteurService:SecteurService,private metierService:MetierService,private marcheeService:MarcheeService,private entrepriseService:EntrepriseServiceService,private bondeCommandeService:BondeCommandeService,private articleService:ArticleService,private articleUtiliseeService:ArticleUtiliseeService) { }

  ngOnInit(): void {
    //this.getOrganisation(this.idOrgan);
    this.onGetSecteurs();
   
   
   
    console.log("heye hey heeey");
    console.log("hello");
    //console.log("lll "+this.newBC.listeArticles.length);
  }

  //modal pour l'ajout dune bonde commande
  public onOpenBCModal():void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    button.setAttribute('data-target','#addBCModal');
    container?.appendChild(button);
    button.click();

  }

  //Modal pur le choix des articles dans la BC
  public onOpenArticlesModal(indicedeBC:number):void{
   const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    this.indiceBC=indicedeBC;
    button.setAttribute('data-target','#articleModal');
    container?.appendChild(button);
    button.click();

  }
  

  //récuperer l'organisation ,le secteur d'activité et la liste des metiers relatives
 /* public getOrganisation(organId:number){
    this.organService.getOneOrganisation(organId).subscribe({
      next: (response:Organisation) => {
        this.idOrgan = response.id;
        console.log("organisation"+response);
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);
       },
      complete: () => console.info('complete') 
  })

  }
  */

  
  //ajouter marchee
  public onAddMarchee(addMarcheeForm:NgForm,organId:number):void{
    //chercher lexistance du code avant l'ajout
    this.marcheeService.getMarcheebyCode(addMarcheeForm.value.code).subscribe({
      next: (response:Marchee) => {
        this.showExistMarcheeAlert=true;
        console.log("code existe deja");
      },
      error: (error:HttpErrorResponse) => {
        this.marcheeService.addMarchee(organId,this.idMetier,addMarcheeForm.value).subscribe({
          next: (response:Marchee) =>{
           // this.marchee=response;
            this.idMarchee=response.id;
            console.log("marchee"+response);
            console.log("id marchee"+this.idMarchee);
            var x = document.getElementById("toast")
            x!.className = "show";
            setTimeout(function(){ x!.className = x!.className.replace("show", ""); }, 5000);
            this.successMarchee=true;
            //ajouter les bondes commandes
            
          },
          error: (error:HttpErrorResponse) => {
            alert(error.message);
           },
          complete: () => console.info('complete') 
      })
        
       },
      complete: () => console.info('complete') 
  })
    

  }


  // ajouter une bonde commande
  public addBC(addBCForm:NgForm):void{
    console.log("codeEntreprise"+this.codeEntreprise);
    console.log("premier element"+this.newMarchee.listeBondeCommandes[0]?.nomEntrep);
    console.log("deusieme element"+this.newMarchee.listeBondeCommandes[1]?.nomEntrep);
    this.organService.getOrganisationbyCode(this.codeEntreprise).subscribe({
      next: (response:Organisation) => {
        document.getElementById('addBCModal')?.click();
        this.entreprise=response;
        this.idEntrepriseBc=this.entreprise.id;
        console.log("entreprise ou organisation :  "+this.entreprise);
        console.log("id de l'entreprise :  "+this.idEntrepriseBc);
        let newBC = new BondeCommande();

        newBC.idEntrep=this.entreprise.id;
        newBC.nomEntrep=this.entreprise.nom;
        newBC.montant=this.montantNewBC;
        newBC.delais=this.delaisNewBC;

        newBC.numeros= 1+ this.newMarchee.listeBondeCommandes.length;
        this.newMarchee.listeBondeCommandes.push(newBC);
       /* let bc:BondeCommande = new BondeCommande();
        bc = addBCForm.value;
        bc.idEntrep=this.entreprise.id;
        bc.nomEntrep=this.entreprise.nom;
        bc.numeros= 1+ this.newMarchee.listeBondeCommandes.length;*/
       /* this.newMarchee.listeBondeCommandes.push(this.newBC);
        console.log("longeurrrr   "+this.newMarchee.listeBondeCommandes.length);
        console.log("longeurrrrsszszzsz  montant  "+this.newMarchee.listeBondeCommandes[0].montant);
        console.log("longeurjgjhghjgjrrr   "+this.newMarchee.listeBondeCommandes[this.newBC.numeros -1].listeArticles.length);
        this.aaaa.code="gfgff";
        this.aaaa.designation="deedeed";
        this.aaaa.unitee="kg";
        this.aaaa.prix=5576;
        this.aaaa.quantitee=4566;
        this.newMarchee.listeBondeCommandes[this.newBC.numeros -1].listeArticles.push(this.aaaa);

        console.log("dedeedde"+this.newMarchee.listeBondeCommandes[this.newBC.numeros -1].listeArticles)*/

        addBCForm.reset();
      
       
        
        

        //valider les informations de la bonde commande
       /* document.getElementById('addBCModal')?.click();
        console.log(this.idEntrepriseBc);
         this.bondeCommandeService.addBondeCommande(11,bc.idEntrep,bc).subscribe({
          next: (response:BondeCommande) => {
            console.log("bonde commande"+response)
          },
          error: (error:HttpErrorResponse) => {
            alert(error.message);
           },
          complete: () => console.info('complete') 
          
      })
      */
      
      
  

        
      },
      error: (error:HttpErrorResponse) => {
        this.alerteCodeInexistant=true;
        
       },
      complete: () => console.info('complete') 
  })
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

  //evenement lors du choix d'un secteur
  getMetiers(secteurId:number){
    this.idSecteur=secteurId;
    console.log("idsecteur"+this.idSecteur);
     //récuperer les metiers par secteurs
     this.metierService.getMetiersBySecteur(this.idSecteur).subscribe({
      next: (response:Metier[]) =>{
        this.metiers=response;
        console.log(response);
        
      },
      error: (error:HttpErrorResponse) => {
        console.log("secteur not found or secteur non specifiée")
       },
      complete: () => console.info('complete') 
  })  

  }

  //récuperer un article par code and idMetier
  public getArticleByCode(code:string):void{
    console.log(this.idMetier)
    this.articleService.getArticlebyCodeandMetierId(code,this.idMetier).subscribe({
      next: (response:Article) =>{
        this.newArticle=response;
        console.log("new article"+response);
        //(<HTMLInputElement>document.getElementById("designation")).value=response.designation;
        (<HTMLInputElement>document.getElementById("unitee")).value=response.unitee;
        (<HTMLInputElement>document.getElementById("designationArtc")).value=response.designation;
       


        
      },
      error: (error:HttpErrorResponse) => {
        this.alerteCodeArticleIncorrecte=true;
       },
      complete: () => console.info('complete') 
  })  

  }

  //Ajouter un nouveau article
  public addNewwArticle(addArticleForm:NgForm):void{
    let newArt = new Article();
    newArt=addArticleForm.value;
    newArt.id=this.newArticle.id;
    newArt.designation=this.newArticle.designation;
    newArt.unitee=this.newArticle.unitee;
    this.newMarchee.listeBondeCommandes[this.indiceBC].listeArticles.push(newArt);
   // this.newMarchee.listeBondeCommandes[this.indiceBC].montant += (newArt.prix*newArt.quantitee);
    addArticleForm.reset();
  }


 // caluler le montant total des articles saisies
 public calculTotalArticles(listeArtcs:Article[]):number{
    let montant:number=0;
    for (let i = 0; i < listeArtcs?.length; i++){
      montant += (listeArtcs[i].prix * listeArtcs[i].quantitee);
    }
    return montant;
  }
  
  // tester la validité des articles du bonde commande
 public validerArticles(bondeCom:BondeCommande):void{
   if(bondeCom.montant == this.calculTotalArticles(bondeCom.listeArticles))
   {
     bondeCom.valide=true;
     document.getElementById('add-article-bComm')?.click();
   }
   else{
    this.alerteTotalArticles=true;
   }
}

//validation du marchee et ajout du marchee
public validerBCs():boolean{
  for (let i = 0; i < this.newMarchee.listeBondeCommandes.length; i++){
    if(! this.newMarchee.listeBondeCommandes[i].valide){
      return false;
    }

  }
  return true;
}

  
//reset the article form
public resetForm(form:NgForm):void{
  form.reset();

}

//fermer un alerte
public closeAlert():void{
  this.showExistMarcheeAlert=false;
  this.alerteCodeInexistant=false;
  this.showExistMarcheeAlert=false;
  this.alerteCodeArticleIncorrecte=false;
  this.alerteTotalArticles=false;
  this.alerteMontantBCs=false;
  this.alerteDelaisBCs=false;
 
}

public validerMontantMarchee(marchee:Marchee):boolean{
  let montantTotalBCs : number=0;
  for (let i = 0; i < marchee.listeBondeCommandes.length; i++){
    montantTotalBCs += marchee.listeBondeCommandes[i].montant;
  }
  if(montantTotalBCs == marchee.montant){
    return true;
  }
  else{
    return false;
  }
  
}

  public validerDelaisMarchee(marchee:Marchee):boolean{
    let delaisTotalBCs : number =0;
    for (let i = 0; i < marchee.listeBondeCommandes.length; i++){
      delaisTotalBCs +=  marchee.listeBondeCommandes[i].delais;
    }
    if(delaisTotalBCs == marchee.delais){
      return true;
    }
    else{
      return false;

    }
    
}

//ajouter le marchee si il est valide
public EnregistrerMarchee( addMarcheeForm:NgForm):void{
  if(!this.validerMontantMarchee(this.newMarchee)){
    this.alerteMontantBCs=true;
  }
  if(!this.validerDelaisMarchee(this.newMarchee)){
    this.alerteDelaisBCs=true;
  }
  if(this.validerMontantMarchee(this.newMarchee)&&this.validerDelaisMarchee(this.newMarchee)){
     //chercher lexistance du code avant l'ajout
     this.marcheeService.getMarcheebyCode(addMarcheeForm.value.code).subscribe({
      next: (response:Marchee) => {
        this.showExistMarcheeAlert=true;
        console.log("code existe deja");
      },
      error: (error:HttpErrorResponse) => {
        this.marcheeService.addMarchee(this.idOrgan,this.idMetier,addMarcheeForm.value).subscribe({
          next: (response:Marchee) =>{
           // this.marchee=response;
            this.idMarchee=response.id;
            console.log("marchee"+response);
            console.log("id marchee"+this.idMarchee);
            this.successMarchee=true;
            //ajouter les BCs
            for (let i = 0; i < this.newMarchee.listeBondeCommandes.length; i++){
              this.EnregisterBC(this.idMarchee,this.newMarchee.listeBondeCommandes[i])
            }
            var x = document.getElementById("toast")
            x!.className = "show";
            setTimeout(function(){ x!.className = x!.className.replace("show", ""); }, 5000);
            addMarcheeForm.reset();
            this.newMarchee = new Marchee();
            
          },
          error: (error:HttpErrorResponse) => {
            alert(error.message);
           },
          complete: () => console.info('complete') 
      })
        
       },
      complete: () => console.info('complete') 
  })

}
}

//enregistrer une bonde commande
public EnregisterBC(idMarchee:number,bc:BondeCommande):void{
  this.bondeCommandeService.addBondeCommande(idMarchee,bc.idEntrep,bc).subscribe({
    next: (response:BondeCommande) => {
      console.log("bonde commande"+response);
      this.idBondeCommande=response.id;
      for (let i = 0; i < bc.listeArticles.length; i++){
        this.EnregisterArticle(this.idBondeCommande,bc.listeArticles[i])
      }
    },
    error: (error:HttpErrorResponse) => {
      alert(error.message);
     },
    complete: () => console.info('complete') 
    
})
}

//Enregistrer un article utilisee
public EnregisterArticle(idBC:number,article:Article):void{
  let articleUtiliseeId : ArticleUtiliseeId = new ArticleUtiliseeId();
  articleUtiliseeId.bondecommande_id=idBC;
  articleUtiliseeId.article_id=article.id;
 let artcUtilisee : ArticleUtilisee = new ArticleUtilisee();
 artcUtilisee.prix=article.prix;
 artcUtilisee.quantitee=article.quantitee;
  this.articleUtiliseeService.addArticleUtilisee(articleUtiliseeId.bondecommande_id,articleUtiliseeId.article_id,artcUtilisee).subscribe({
    next: (response:ArticleUtilisee) => {
      console.log("article utilisee"+response);
      
    },
    error: (error:HttpErrorResponse) => {
      alert(error.message);
     },
    complete: () => console.info('complete') 
    
})
}


  
   


}
