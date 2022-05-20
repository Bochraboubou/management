import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/model/Article';
import { ArticleRealisee } from 'src/app/model/ArticleRealisee';
import { ArticleRealiseeId } from 'src/app/model/ArticleRealiseeId';
import { ArticleRealiseeMC } from 'src/app/model/ArticleRealiseeMC';
import { ArticleRealiseeMCId } from 'src/app/model/ArticleRealiseeMCId';
import { ArticleUtilisee } from 'src/app/model/ArticleUtilisee';
import { Attachement } from 'src/app/model/Attachement';
import { AttachementMC } from 'src/app/model/AttachementMC';
import { BondeCommande } from 'src/app/model/BondeCommande';
import { OrdreDefinitif } from 'src/app/model/OrdreDefinitif';
import { OrdreDeTraveaux } from 'src/app/model/OrdreDeTraveaux';
import { Organisation } from 'src/app/model/Organisation';
import { User } from 'src/app/model/User';
import { ArticleRealiseeMCService } from 'src/app/service/article-realisee-mc.service';
import { ArticleRealiseeService } from 'src/app/service/article-realisee.service';
import { ArticleUtiliseeService } from 'src/app/service/article-utilisee.service';
import { ArticleService } from 'src/app/service/article.service';
import { AttachementMCService } from 'src/app/service/attachement-mc.service';
import { AttachementService } from 'src/app/service/attachement.service';
import { BonLivraisonMCService } from 'src/app/service/bon-livraison-mc.service';
import { BondeCommandeService } from 'src/app/service/bonde-commande.service';
import { LoginService } from 'src/app/service/login.service';
import { OrdreDeTraveauxService } from 'src/app/service/ordre-de-traveaux.service';
import { OrdreDefinitifService } from 'src/app/service/ordre-definitif.service';
import { OrganisationServiceService } from 'src/app/service/organisation-service.service';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-mcattachement',
  templateUrl: './mcattachement.component.html',
  styleUrls: ['./mcattachement.component.css']
})
export class MCattachementComponent implements OnInit {
  id!:number
  username!:string
  supArticle!:string
  ModifArticle!:string
  modifArticleVar=new Article()
  bondeCommande!:BondeCommande
  articleUtulisee!:ArticleUtilisee
  listeArticlesRealiseeMC:ArticleRealiseeMC[]=[]
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
  attachement1=new AttachementMC()
  articleRealiseef!:ArticleRealisee
  articleRealisee=new ArticleRealisee()
  articleRealiseeMCID=new ArticleRealiseeMCId()
  attachementId!:number
  reste!:number
  codeArticleRealisee!:string
  attachement!:AttachementMC
  Qte!:number
  
  articleRealiseeMCT=new ArticleRealiseeMC()
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
  attachementMCliste!:AttachementMC[]
  d=new Date()
  //liste des articles realisee mc
  listeArtRMC!:ArticleRealiseeMC[]
  artID!:number
  OrdreDeTraveau!:OrdreDeTraveaux
  ordresDefinitives!:OrdreDefinitif[]
  //la somme a afficher
  sommeAff!:number
  /**********Declaration attachement materielle ************** */
  attachementNormale=1
  x=0
  materielDuBL!:Article[]
  constructor( private router:Router, public loginService:LoginService,private attachementService:AttachementService,
    private artService:ArticleService,
   private route:ActivatedRoute,
   private  ordrDefService:OrdreDefinitifService,
   private articleRealMCService:ArticleRealiseeMCService,
   private register:RegisterService,
   public organisationService:OrganisationServiceService,
   private ordreService:OrdreDeTraveauxService,
   private attachementMCService:AttachementMCService, 
   private blMCService:BonLivraisonMCService
  )
    { }
  
  
    ngOnInit(): void {
      console.log("eeeeeeeeeeeeeeee")
      this.username=this.loginService.loggedUser
      this.id=this.route.snapshot.params['id'];
      this.getOrdreDetraveauxById(this.id)
      this.findOrganisation(this.username)
      this.getMaterielBYBLMCid(this.id)
     
 
    
     // this.trouverArticles()
    }

//
ok(){
  console.log( this.idOrgan)
  //this.findOrganisation(this.username)
 
 // console.log(this.organisation.id)
}
getOrdreDetraveauxById(id:number){
  this.OrdreDeTraveau= new OrdreDeTraveaux();
  this.ordreService.getOrdreDeTraveauById(id).subscribe({
    next: (response:OrdreDeTraveaux) => {
      this.OrdreDeTraveau=response
      console.log(this.OrdreDeTraveau.id)
      this.getListeOrdresDeffinitives(this.OrdreDeTraveau.id)
     // this.findOrganisation(this.username);

    },
    error: (error:HttpErrorResponse) => {
      console.log(error.message);
     
     },
    complete: () => console.info('complete')
  })
}

  //liste des ordes definitif

  getListeOrdresDeffinitives(id:number){
    this.ordrDefService.getOTbyOTid(id).subscribe({
      next: (response:OrdreDefinitif[]) => {
        this.ordresDefinitives=response
        console.log(this.ordresDefinitives)
        for(let i=0;i<this.ordresDefinitives.length;i++){
          console.log(this.ordresDefinitives[i].id.article_id)
          console.log(this.ordresDefinitives[i].id.ordreDeTraveauxId_id)
    this.artService.getArticlebyId(this.ordresDefinitives[i].id.article_id).subscribe({
      next: (response:Article) => {
       this. article=response
     console.log (this.article.code)
     this.ordresDefinitives[i].code=this.article.code
    },
    error: (error:HttpErrorResponse) => {
      console.log(error.message);
     // alert("vous n'etes plus attaché a une organisation")
     },
    complete: () => console.info('complete') 
    })
        }
    },
    error: (error:HttpErrorResponse) => {
      console.log(error.message);
     // alert("vous n'etes plus attaché a une organisation")
     },
    complete: () => console.info('complete') 
    })
      }

//chercher code article utulisee
recherche2(){
  let res=""
  let artUltulTab=new ArticleUtilisee()
  for (let i=0;i<this.ordresDefinitives.length;i++){
    if(this.ordresDefinitives[i].code==this.code){
      res=this.ordresDefinitives[i].code
      // stocker du id de l'article courante

     
   // artUltulTab=this.articlesUtulisees[i]
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
console.log(this.article)
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
this.articleRealiseeMCID.article_id=this.article.id

},
error: (error:HttpErrorResponse) => {
console.log(error.message);
this.alertecodeArticle=1

},
complete: () => console.info('complete')  
})

}
}

  sumDesArticles(){
     let somme=0
    this.attachementMCService.getAllAttachementMC().subscribe({
      next: (response:AttachementMC[]) => {
        this.attachementMCliste=response
        console.log("liste attachement MC"+this.attachementMCliste )
        console.log(this.attachementMCliste)
  
        this.attachementMCliste.forEach((curAttachementMC) => {
          this.articleRealMCService.getArticleRbyAttacId(curAttachementMC.id).subscribe({
            next: (response:ArticleRealiseeMC[]) => {
             // liste des articles realiséee
              this.listeArtRMC=response
              console.log("aaa")
              console.log(this.listeArtRMC)
       //parcourir la liste 
            this.listeArtRMC.forEach((currAricleRMC) => {
                           if (currAricleRMC.id.article_id==this.artID){
                             somme=somme+currAricleRMC.quantiteeRealisee
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
      if(this.existe==""){
        this.alertAttachementExiste=1
  
      }
      else{
        this.openImprimerModal();
      }
      
    }
  

// remplr tableau des articles realisee dans mc 
    remplirTableau(form:NgForm){
      let articleT=new Article()
    articleT=form.value
    for(let i=0;i<this.ordresDefinitives.length;i++){
      if(this.ordresDefinitives[i].code==this.code){
        articleT.code= this.code;
        articleT.id=this.ordresDefinitives[i].id.article_id
      articleT.quantitee=this.Qte
      articleT.designation=this.article2.designation
      this.listeArticles.push(articleT)
      form.reset()
     this. articleAjouter=1;
      console.log(this.listeArticles)
      }
    }
      
    }




    findOrganisation(username:string){
      this.register.findByUserName(this.username).subscribe(
        (        data: any)=>{
          this.user=data;
          this.organisationService.getOrganisationbyUser(this.user.id).subscribe({
            next: (response:Organisation) => {
              this.organisation=response;
              console.log("organisation"+response);
              this.idOrgan=this.organisation.id;
              console.log(this.organisation.id)

              console.log("iiiiiiiiiiiiiiiiiiiiid")
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
   // this.attachement1.BCid=this.id
  
    
  console.log("le code de l'attachement est "+this.attachement1.codeAttachementMC)
  console.log("bon de commande attachement"+this.attachement1)
  //test sur le champ code 
  this.attachementMCService.getByCode(this.attachement1.codeAttachementMC).subscribe({
  next:(response:AttachementMC)=>{
  this.attachement=response
  console.log(this.attachement)
  
  if( this.attachement==null){
  this.attachementMCService.addAttachementMC(this.id,this.attachement1).subscribe({
    next:(response:AttachementMC)=>{
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
  
  
  
  
  }
  
  
  
  
  
  
  RemplirListeArticleRealisee(){
    console.log(this.listeArticles)
  this.listeArticles.forEach((curArticle) => {
  
     // console.log(curArticle)
      this.articleRealiseeMCID.article_id=curArticle.id;
      this.articleRealiseeMCID.attachementMC_id=this.attachementId
      this.articleRealiseeMCT.id=this.articleRealiseeMCID
      //console.log(this.articleRealiseeMCID)
      this.articleRealiseeMCT.quantiteeRealisee=curArticle.quantitee
      console.log(this.articleRealiseeMCT)
    
      this.listeArticlesRealiseeMC.push(this.articleRealiseeMCT)
      this.articleRealiseeMCT=new ArticleRealiseeMC()
      this.articleRealiseeMCID=new ArticleRealiseeMCId()
    
  })
  
    console.log(this.listeArticlesRealiseeMC)
    console.log(this.listeArticlesRealiseeMC.length)
    this.AddListeArticesRtoBD();
   }
  
  //Ajouter la liste des articles realisee a la base de donnée
  AddListeArticesRtoBD(){
    console.log("kkkkkkkkkkkkkkkkkkkkkkkk")
   this.listeArticlesRealiseeMC.forEach((curArticle) => {
      console.log(curArticle.id.attachementMC_id,curArticle.id.article_id,curArticle.quantiteeRealisee)
  
     this.articleRealMCService.createAricleReaMC(curArticle.id.attachementMC_id,curArticle.id.article_id,curArticle).subscribe({
         next: (response:ArticleRealiseeMC) =>{
          // this.articleRealiseef=response
           console.log("bien")
          },
          error: (error:HttpErrorResponse) => {
            console.log(error.message);
            console.log("nnnn")
           },
          complete: () => console.info('complete')  
        })
       
      })
      console. log("liste des articles bien ajouter")
  }
  
  
    
  
  //////juste
  //liste des articles dans OT
   /* trouverArticles(){


      /*
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
     }*/
   
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
  imprimer(id:number){
   
    this.router.navigate(['imprimerAttachement',id])
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

/************************************************ */
/************************Attachement materiels*********************** */
/**************************************************** */
getMaterielBYBLMCid(id:number){
  this.blMCService.getMaterielsBuBL(id).subscribe({
    next: (response:Article[]) => {
      this. materielDuBL=response
     alert("bien")
      console.log(this.materielDuBL)
   
   },
   error: (error:HttpErrorResponse) => {
     console.log(error.message);
     alert("erreur")
    // alert("vous n'etes plus attaché a une organisation")
    },
   complete: () => console.info('materiel du BL MC ') 
   })

}
attachemenMateriel( form:NgForm){
  alert("Vous etes dans l'interface attachement materielle")
  // afficher le div attachemnt normale 
  this.attachementNormale=0
// pour afficher div materielle 

form.reset()

}
attachementNormaleONN(attachementMateriel:NgForm){
  alert("Vous etes dans l'interface attachement normale  ")
  // afficher le div attachemnt normale 
  this.attachementNormale=1
// pour afficher div materielle 

attachementMateriel.reset()
}

recherche2Materiel(){

}
remplirTableauMateriel(form1:NgForm){

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