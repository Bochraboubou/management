import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/model/Article';
import { BondeCommande } from 'src/app/model/BondeCommande';
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
  idBC!: any;

  articlesBC!: Article[];
  articlesOT:Article[]=[];

  BC!: BondeCommande;
  OT!: OrdreDeTraveaux;
  articleC: Article=new Article();

  constructor(private bondeCommandeService:BondeCommandeService,private articleService:ArticleService,private articleRservice:ArticleRService,private ordreTraveauxService:OrdreDeTraveauxService,private ordreDefinitifService:OrdreDefinitifService,private route:ActivatedRoute) { }

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
    complete: () => console.info('get ariclesRealisees complete') 
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

 //fermer un alerte
public closeAlert():void{
 this.alerteArticleExisteDeja=false;
 
}




}
