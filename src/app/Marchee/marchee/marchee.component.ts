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
import { Type } from 'src/app/model/Type';
import { UniteeMonnee } from 'src/app/model/UniteeMonnee';
import { User } from 'src/app/model/User';
import { ArticleUtiliseeService } from 'src/app/service/article-utilisee.service';
import { ArticleService } from 'src/app/service/article.service';
import { BondeCommandeService } from 'src/app/service/bonde-commande.service';
import { EntrepriseServiceService } from 'src/app/service/entreprise-service.service';
import { LoginService } from 'src/app/service/login.service';
import { MarcheeService } from 'src/app/service/marchee.service';
import { MetierService } from 'src/app/service/metier.service';
import { OrganisationServiceService } from 'src/app/service/organisation-service.service';
import { RegisterService } from 'src/app/service/register.service';
import { SecteurService } from 'src/app/service/secteur.service';
import { TypeService } from 'src/app/service/type.service';
import { UniteeMonneeService } from 'src/app/service/unitee-monnee.service';
import { ArticlespecifieeComponent } from '../articlespecifiee/articlespecifiee.component';

@Component({
  selector: 'app-marchee',
  templateUrl: './marchee.component.html',
  styleUrls: ['./marchee.component.css']
})
export class MarcheeComponent implements OnInit {
 
  organisationConnectee!: Organisation;
  idSecteur!: number;
  idEntreprise!: number;
  idMarchee!: number;
  idEntrepriseBc!: number;
  entreprise!: Organisation;
  idMetier!: number;
  codeEntreprise!: string;
  newMarchee: Marchee= new Marchee();
  indiceBC!: number;
  montantArticles:number= 0;
  codeNewBC!: string;
  montantNewBC!: number;
  delaisNewBC!: number;
  dateDTNewBC!: Date;
  newArticle:Article= new Article();
  codeArticle!: string;
  key:any;
  totalLength:any;
  page:number = 1;
  printedBCommande!: BondeCommande;
  printMarchee: any;
  editArticleIndice!: number;
  modifiedArticle!: Article;
  modifiedBC!: BondeCommande;
  deleteArticleIndice!: number;
  idType!: number;
  //tableaux et listes
  //tableaux et listes
  metiers!: Metier[];
  secteurs!: Secteur[];
  types!: Type[];
  articlesParMetier!: Article[];
  listeUniteesMontant!: UniteeMonnee[];
  //variables boolean
 
  marcheeValide:boolean = false;
  BCsvalides:boolean = false;
  //alertes
  showExistMarcheeAlert:boolean=false;
  alerteCodeInexistant:boolean=false;
  alerteCodeArticleIncorrecte:boolean=false;
  alerteTotalArticles:boolean=false;
  alerteMontantBCs:boolean=false;
  alerteDelaisBCs:boolean=false;
  alerteArticleExisteDeja:boolean=false;
  alertecodeBCexiste=false;
  alerteCodeArticleutilisee:boolean = false;
  montantTotaldeBCs!: number;
  username!: string;
  montantAvecTVAPrintedBC!: number;
  
 //
 user=new User()
 organisation!:Organisation

  constructor(private organService:OrganisationServiceService,
    private secteurService:SecteurService,private metierService:MetierService,
    private marcheeService:MarcheeService,
    private bondeCommandeService:BondeCommandeService,
    private articleService:ArticleService,
    private articleUtiliseeService:ArticleUtiliseeService,
    private organisationService:OrganisationServiceService,
    public loginService:LoginService,
    private uniteeMonneeService:UniteeMonneeService
    ,private register:RegisterService,
    private typeService:TypeService
   ) { }

  ngOnInit(): void {
   this.onGetOrganisationbyUser();
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

  //Modal pour modifier le prix ou la quantitee d'un article s'il sont incorrecte
  public onOpenEditArticleModal(indiceArticle:number):void{
    const container=document.getElementById('main-container');
     const button=document.createElement('button');
     button.type='button';
     button.style.display='none';
     button.setAttribute('data-toggle','modal');
     this.editArticleIndice = indiceArticle;
     this.modifiedArticle = this.newMarchee.listeBondeCommandes[this.indiceBC].listeArticles[this.editArticleIndice];
     button.setAttribute('data-target','#editArticleModal');
     container?.appendChild(button);
     button.click();
   }
 
   //Modal pour la confirmation du marchee
  public onOpenConfirmMarcheeModal():void{
    const container=document.getElementById('main-container');
     const button=document.createElement('button');
     button.type='button';
     button.style.display='none';
     button.setAttribute('data-toggle','modal');
     button.setAttribute('data-target','#confirmInformationsModal');
     container?.appendChild(button);
     button.click();
   }
    //Modal pour modifier la bc
  public onOpeneditBCModal( indice:number):void{
    const container=document.getElementById('main-container');
     const button=document.createElement('button');
     button.type='button';
     button.style.display='none';
     button.setAttribute('data-toggle','modal');
     this.indiceBC=indice;
     this.modifiedBC = this.newMarchee.listeBondeCommandes[this.indiceBC];
     button.setAttribute('data-target','#editBCModal');
     container?.appendChild(button);
     button.click();
  }

   //Modal pour supprimer la bc
   public onOpendeleteBCModal( indice:number):void{
    const container=document.getElementById('main-container');
     const button=document.createElement('button');
     button.type='button';
     button.style.display='none';
     button.setAttribute('data-toggle','modal');
     this.indiceBC=indice;
     this.modifiedBC = this.newMarchee.listeBondeCommandes[this.indiceBC];
     button.setAttribute('data-target','#deleteBCModal');
     container?.appendChild(button);
     button.click();
  }

    //Modal pour supprimer un article
    public onOpendeleteArticleModal( indice:number):void{
      const container=document.getElementById('main-container');
       const button=document.createElement('button');
       button.type='button';
       button.style.display='none';
       button.setAttribute('data-toggle','modal');
       this.deleteArticleIndice=indice;
       this.modifiedBC = this.newMarchee.listeBondeCommandes[this.indiceBC];
       button.setAttribute('data-target','#deleteArticleModal');
       container?.appendChild(button);
       button.click();
    }

    //Modal pour l'ajout d'un article
   public onOpenAddArticleInexistantModal():void{
    const container=document.getElementById('main-container');
     const button=document.createElement('button');
     button.type='button';
     button.style.display='none';
     button.setAttribute('data-toggle','modal');
     button.setAttribute('data-target','#addArticleModal');
     container?.appendChild(button);
     button.click();
 
   }

  // ajouter une bonde commande
  public addBC(addBCForm:NgForm):void{
    if(this.testExistCodeBC(this.codeNewBC,this.newMarchee.listeBondeCommandes)){
      this.alertecodeBCexiste=true;

    }

    else if(!this.validerDelaiBC(addBCForm.value.delais,this.newMarchee)){
      this.alerteDelaisBCs=true;
    }
   
   
    if(this.validerDelaiBC(addBCForm.value.delais,this.newMarchee)&&!this.testExistCodeBC(this.codeNewBC,this.newMarchee.listeBondeCommandes)){
      this.organService.getOrganisationbyCode(this.codeEntreprise).subscribe({
        next: (response:Organisation) => {
          this.entreprise=response;
          this.idEntrepriseBc=this.entreprise.id;
          console.log("entreprise ou organisation :  "+this.entreprise);
          console.log("id de l'entreprise :  "+this.idEntrepriseBc);
          console.log("codeEntreprise"+this.codeEntreprise);
          document.getElementById('addBCModal')?.click();
          let newBC = new BondeCommande();
          newBC.idEntrep=this.entreprise.id;
          newBC.nomEntrep=this.entreprise.nom;
          newBC.codebc=this.codeNewBC;
          newBC.montant=this.montantNewBC;
          newBC.delais=this.delaisNewBC;
          newBC.dateDebutTraveaux=this.dateDTNewBC;
          this.newMarchee.listeBondeCommandes.push(newBC);
          addBCForm.reset(); 
    
         
          
    
        },
        error: (error:HttpErrorResponse) => {
          console.log("code entreprise non trouvee");
          this.alerteCodeInexistant=true;
         },
        complete: () => console.info('complete') 
    })
     
    }
  }

   //récuperer la liste des unitees de monnais
   public onGetUnitees():void{
    this.uniteeMonneeService.getUnitees().subscribe({
      next: (response:UniteeMonnee[]) => {
        this.listeUniteesMontant=response;
        console.log("uniteesDeMonnaies"+this.listeUniteesMontant)
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);

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
  public getArticleByCodeandMetier(code:string):void{
    console.log(this.idMetier)
    this.articleService.getArticlebyCodeandMetierId(code,this.idMetier).subscribe({
      next: (response:Article) =>{
        this.newArticle=response;
        console.log("new article"+response);
        if(this.testExistArticleBC(code,this.newMarchee.listeBondeCommandes[this.indiceBC].listeArticles)){
            //(<HTMLInputElement>document.getElementById("designation")).value=response.designation;
        (<HTMLInputElement>document.getElementById("unitee")).value=response.unitee;
        (<HTMLInputElement>document.getElementById("designationArtc")).value=response.designation;
        
        }else{
          this.alerteArticleExisteDeja=true;
    
        }
      
       


        
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

  //tester si l'article est deja ajoutee dans la bondeCommande
  public testExistArticleBC(codeArt:string,listeArticles:Article[]):boolean{
    for (let i = 0; i < listeArticles?.length; i++){
      if(codeArt== listeArticles[i]?.code){
        return false;
      }
    }
    return true;

  }

  //tester si le code de la bc est deja utilisee dans une autre bc
  public testExistCodeBC(codebc:string,listebcs:BondeCommande[]):boolean{
    for (let i = 0; i < listebcs?.length; i++){
      if(codebc == listebcs[i]?.codebc){
        return true;
      }
    }
    return false;

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
 public validerArticles(bondeCom:BondeCommande,indice:number):void{
   this.indiceBC=indice;
   if(bondeCom.montant == this.calculTotalArticles(bondeCom.listeArticles))
   {
     bondeCom.valide=true;
     //(<HTMLInputElement>document.getElementById("validerCommandeButton")).innerText="Commande validée"
    // document.getElementById('add-article-bComm')?.click();
   }
   else{
    this.alerteTotalArticles=true;
   }
}


//tester l'existance du code d'entreprise
public testerCodeEntreprise(code:string):boolean{
  let exist:boolean=false;
  this.organService.getOrganisationbyCode(this.codeEntreprise).subscribe({
    next: (response:Organisation) => {
      this.entreprise=response;
      this.idEntrepriseBc=this.entreprise.id;
      console.log("entreprise ou organisation :  "+this.entreprise);
      console.log("id de l'entreprise :  "+this.idEntrepriseBc);
      exist=true;
      

    },
    error: (error:HttpErrorResponse) => {
      console.log("code entreprise non trouvee");
     },
    complete: () => console.info('complete') 
})
return exist;
}

//tester la validation des bcs
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
  this.alerteArticleExisteDeja=false;
  this.alertecodeBCexiste=false;
 
}

public validerMontantMarchee(marchee:Marchee):boolean{
  let montantTotalBCs : number=0;
  for (let i = 0; i < marchee.listeBondeCommandes.length; i++){
    montantTotalBCs += marchee.listeBondeCommandes[i].montant;
  }
  this.montantTotaldeBCs=montantTotalBCs;
  if(montantTotalBCs == marchee.montant){
    return true;
  }
  else{
    return false;
  }
  
}

  public validerDelaiBC(delais:number, marchee:Marchee):boolean{
    if(delais <= marchee.delais){
      return true;
    }
    else{
      return false;

    }
  }

   
    

//valider les bondes commandes
public validerMontantsetDelaisBCs():void{
  console.log("montant du marchee"+this.newMarchee.montant);
    if(!this.validerMontantMarchee(this.newMarchee)){
      this.alerteMontantBCs=true;
    }
    else{
      this.BCsvalides=true;
      
    }

}

//ajouter le marchee si il est valide
public EnregistrerMarchee( addMarcheeForm:NgForm):void{
        this.marcheeService.addMarchee(this.organisationConnectee.id,this.idMetier,this.newMarchee).subscribe({
          next: (response:Marchee) =>{
           // this.marchee=response;
            this.idMarchee=response.id;
            console.log("marchee"+response);
            console.log("id marchee"+this.idMarchee);
            //ajouter les BCs
            for (let i = 0; i < this.newMarchee.listeBondeCommandes.length; i++){
              this.EnregisterBC(this.idMarchee,this.newMarchee.listeBondeCommandes[i])
            }
            var x = document.getElementById("toast")
            x!.className = "show";
            setTimeout(function(){ x!.className = x!.className.replace("show", ""); }, 5000);
            addMarcheeForm.reset();
            this.newMarchee = new Marchee();
            this.marcheeValide=false;
            this.BCsvalides=false;
            
          },
          error: (error:HttpErrorResponse) => {
            alert(error.message);
           },
          complete: () => console.info('complete') 
      })  

}

//enregistrer une bonde commande
public EnregisterBC(idMarchee:number,bc:BondeCommande):void{
  this.bondeCommandeService.addBondeCommande(idMarchee,bc.idEntrep,bc).subscribe({
    next: (response:BondeCommande) => {
      console.log("bonde commande"+response);
      let idBondeCommande=response.id;
      for (let i = 0; i < bc.listeArticles.length; i++){
        this.EnregisterArticle(idBondeCommande,bc.listeArticles[i])
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


//recuperer les articles par metier
public getArticlesByMetier(idMetier:number){
  this.articleService.getArticlebyMetierId(idMetier).subscribe({
    next: (response:Article[]) =>{
      this.articlesParMetier=response;
      console.log("articles par metier"+response);
      this.totalLength=response.length;
     this.getTypes(idMetier);
      
    },
    error: (error:HttpErrorResponse) => {
      console.log("metier not found");
     },
    complete: () => console.info('complete') 
})  

}

 //récuperer la liste des types du metier du marché
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

//event lors de chois du metier pour recuperer la liste d'articles par metier
ArticlesByMetier(metierId:number){
  this.getArticlesByMetier(metierId);
}

public printBC(indiceP :number,printMarcheeForm:NgForm):void{
  console.log("take the BC to print ....");
  const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    this.printedBCommande = this.newMarchee.listeBondeCommandes[indiceP];
    this.montantAvecTVAPrintedBC=this.newMarchee.listeBondeCommandes[indiceP].montant +( this.newMarchee.listeBondeCommandes[indiceP].montant * 0.19);
    this.printMarchee = printMarcheeForm.value;
    button.setAttribute('data-target','#printBCModal');
    container?.appendChild(button);
    button.click();
  
 
}

public editArticle(modifierArticleForm:NgForm){
  this.newMarchee.listeBondeCommandes[this.indiceBC].listeArticles[this.editArticleIndice].prix = modifierArticleForm.value.prixEditArticle;
  this.newMarchee.listeBondeCommandes[this.indiceBC].listeArticles[this.editArticleIndice].quantitee = modifierArticleForm.value.quantiteeEditArticle;
  document.getElementById('closeEditArticleButton')?.click();
  //modifierArticleForm.reset();
}

//valider les information du marchee
public validerInformationsMarchee(addMarcheeForm:NgForm){
  this.marcheeService.getMarcheebyCodeandOrganisation(addMarcheeForm.value.code,this.organisationConnectee.id).subscribe({
    next: (response:Marchee) => {
      this.showExistMarcheeAlert=true;
      console.log("code existe deja");
    },
    error: (error:HttpErrorResponse) => {
      this.marcheeValide=true;
      console.log("new marchee  :"+this.newMarchee);
      document.getElementById('closeConfirmModal')?.click();
     
      
     },
    complete: () => console.info('complete') 
})

}
//modifier bc
public modifierBC(editBCForm:NgForm){
  this.newMarchee.listeBondeCommandes[this.indiceBC].montant=editBCForm.value.montant;
  document.getElementById('closeEditBCModal')?.click();

 /* if(this.validerDelaiBC(editBCForm.value.delais,this.newMarchee)){
    this.newMarchee.listeBondeCommandes[this.indiceBC].montant=editBCForm.value.montant;
    //this.newMarchee.listeBondeCommandes[this.indiceBC].delais=editBCForm.value.delais;
    document.getElementById('closeEditBCModal')?.click();

  }else{
    this.alerteDelaisBCs=true;
  }
  */
}

//supprimer bc
  public supprimerBC(){
    this.newMarchee.listeBondeCommandes.splice(this.indiceBC,1);
    document.getElementById('closeDeleteBCModal')?.click();
    
  
  
}

//supprimer article
public deleteArticle(){
  this.newMarchee.listeBondeCommandes[this.indiceBC].listeArticles.splice(this.deleteArticleIndice,1);
  document.getElementById('closeDeleteArticleModal')?.click();
  
}


  //récuperer l'organisation connecté actuellement
  public onGetOrganisationbyUser():void{
    this.username=this.loginService.loggedUser;
    this.organisationService.getOrganisationbyUserName(this.username).subscribe({
      next: (response:Organisation) => {
        this.organisationConnectee=response;
        console.log("organisation connectee"+this.organisationConnectee);
        this.onGetSecteurs();
        this.onGetUnitees();
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);

       },
      complete: () => console.info('complete') 
  })
  }

   //ajouter un article
   public addArticle(idMetier:number,idType:number,article:Article):void{
    this.articleService.addArticle(idMetier,idType,article).subscribe({
     next: (response:Article) =>{
       console.log("id du article ajoutee "+response.id);
       this.getArticlesByMetier(idMetier);
       
     },
     error: (error:HttpErrorResponse) => {
      alert(error.message);

      },
     complete: () => console.info(' add article complete') 
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
      this.addArticle(this.idMetier,this.idType,articleForm.value);
      document.getElementById('closeAjoutModal')?.click();
      articleForm.reset();
     },
    complete: () => console.info('complete') 
})
 
 }


  
   


}
