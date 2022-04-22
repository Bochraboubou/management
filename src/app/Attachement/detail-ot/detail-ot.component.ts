import { DatePipe, formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/model/Article';
import { BondeCommande } from 'src/app/model/BondeCommande';
import { OrdreDefinitif } from 'src/app/model/OrdreDefinitif';
import { OrdreDeTraveaux } from 'src/app/model/OrdreDeTraveaux';
import { ArticleRService } from 'src/app/service/article-r.service';
import { ArticleService } from 'src/app/service/article.service';
import { BondeCommandeService } from 'src/app/service/bonde-commande.service';
import { OrdreDeTraveauxService } from 'src/app/service/ordre-de-traveaux.service';
import { OrdreDefinitifService } from 'src/app/service/ordre-definitif.service';


@Component({
  selector: 'app-detail-ot',
  templateUrl: './detail-ot.component.html',
  styleUrls: ['./detail-ot.component.css']
})
export class DetailOTComponent implements OnInit {
  alerteArticleExisteDeja:boolean=false;
  alerteMontantBCdepassee:boolean=false;
  alerteCodeOTutilisee:boolean=false;
  idBC!: any;

  articlesBC!: Article[];
  articlesOT:Article[]=[];

  BC!: BondeCommande;
  OT: OrdreDeTraveaux= new OrdreDeTraveaux();
  articleC: Article=new Article();
  montantTotalOT!: number;
  currentDate!: string;


  constructor(private bondeCommandeService:BondeCommandeService,private articleService:ArticleService,private articleRservice:ArticleRService,private ordreTraveauxService:OrdreDeTraveauxService,private ordreDefinitifService:OrdreDefinitifService,private route:ActivatedRoute,private datePipe: DatePipe) {
    this.currentDate = datePipe.transform(Date.now(),'yyyy-MM-dd')!;
    console.log("current date: "+this.currentDate);
    var dateString = '08-25-2018';  

   }

  ngOnInit(): void {
    this.route.paramMap.subscribe(res=>{
      this.idBC=res.get('id');
      console.log("id recuperee"+this.idBC);
      this.onGetBonDeCommandeById(this.idBC);
    })

  }

   //récuperer la bonDeCommande recus
   public onGetBonDeCommandeById(idBC:number):void{
    this.bondeCommandeService.getBondeCommandeJoinbybcId(idBC).subscribe({
      next: (response:BondeCommande) => {
        this.BC=response;
        this.onGetArticlesUtilisees(idBC);
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);

       },
      complete: () => console.info('recus bc  complete') 
  })
}

//récuperer les articlesUtilisees par bc
public onGetArticlesUtilisees(idBC:number):void{
  this.articleRservice.getArticlesUtiliseesbybcId(idBC).subscribe({
    next: (response:Article[]) => {
      this.articlesBC=response.sort((a, b) => (a.typeLib > b.typeLib) ? 1 : -1);
      console.log(" prix du premier article utilisee :   "+this.articlesBC[0].prix);
     
    },
    error: (error:HttpErrorResponse) => {
      alert(error.message);

     },
    complete: () => console.info('get aricles Utilisee complete') 
})
}
  
  
  //event lors du choix du code d'article
  getArticleChoisis(articleIndice:number){
    console.log("indice d'article choisis"+articleIndice);
    this.articleC=this.articlesBC[articleIndice];
    (<HTMLInputElement>document.getElementById("unitee")).value=this.articleC.unitee;
    (<HTMLInputElement>document.getElementById("designationArtc")).value=this.articleC.designation; 
    (<HTMLInputElement>document.getElementById("prixArtC")).value=String(this.articleC.prix); 
  }

  //ajouter un article aux ordre de travail
  public addArticletoOrdre():void{
    this.articlesOT.push(this.articleC);

  }

  // caluler le montant total des articles saisies
 public calculTotalArticles(listeArtcs:Article[]):number{
  let montant:number=0;
  for (let i = 0; i < listeArtcs?.length; i++){
    montant += (listeArtcs[i].prix * listeArtcs[i].quantiteeOrderee);
  }
  return montant;
}

public EnregisterOT():void{
  this.ordreTraveauxService.getTotalMontantOT().subscribe({
    next: (response:number) =>{
      this.montantTotalOT=response+this.calculTotalArticles(this.articlesOT);
      console.log("montant total des OTs "+this.montantTotalOT);
      if(this.montantTotalOT>this.BC.montant){
        this.alerteMontantBCdepassee=true;
      }
      else{
        const container=document.getElementById('main-container');
        const button=document.createElement('button');
        button.type='button';
        button.style.display='none';
        button.setAttribute('data-toggle','modal');
        button.setAttribute('data-target','#enregistrerOTmodal');
        container?.appendChild(button);
        button.click();

      }
      
    },
    error: (error:HttpErrorResponse) => {
      alert(error.message);

     },
    complete: () => console.info('get bondes commandes by marchee and organisation complete') 
})  

 }

 public sauvgarderOT(OTform:NgForm):void{
   this.OT.dateOrdre=new Date(this.currentDate);
   this.OT.montant=this.calculTotalArticles(this.articlesOT);
   this.ajouterOT(this.BC.id,this.OT);
   
   

 }

 //ajoutert un OT
public ajouterOT(idBC:number,ot:OrdreDeTraveaux):void{
  this.ordreTraveauxService.addOT(idBC,ot).subscribe({
    next: (response:OrdreDeTraveaux) => {
      this.OT=response;
      console.log(" OT ajouté :  "+this.OT);
      for (let i = 0; i < this.articlesOT.length; i++) {
        let od =new OrdreDefinitif();
        od.quantiteeOrderee=this.articlesOT[i].quantiteeOrderee;
        this.ajouterOrdreDefinitif(response.id,this.articlesOT[i].id,od);
      }
     
    },
    error: (error:HttpErrorResponse) => {
      alert(error.message);

     },
    complete: () => console.info('Ajout OT  complete') 
})
}

//ajouterUnOrdreDefinitif
public ajouterOrdreDefinitif(idOT:number,idArticle:number,ordreDefinitif:OrdreDefinitif):void{
  this.ordreDefinitifService.addOrdreDefinitif(idOT,idArticle,ordreDefinitif).subscribe({
    next: (response:OrdreDefinitif) => {
      console.log("ajout article dans OT avec succé");
     
    },
    error: (error:HttpErrorResponse) => {
      alert(error.message);

     },
    complete: () => console.info('Ajout ordre definitif complete') 
})
}

 //fermer un alerte
public closeAlert():void{
 this.alerteArticleExisteDeja=false;
 this.alerteMontantBCdepassee=false;
 this.alerteCodeOTutilisee=false;
 
}




}
