import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Article } from 'src/app/model/Article';

import { ArticleUtilisee } from 'src/app/model/ArticleUtilisee';
import { BondeCommande } from 'src/app/model/BondeCommande';
import { Metier } from 'src/app/model/Metier';
import { Organisation } from 'src/app/model/Organisation';
import { Secteur } from 'src/app/model/Secteur';
import { ArticleUtiliseeService } from 'src/app/service/article-utilisee.service';
import { ArticleService } from 'src/app/service/article.service';
import { BondeCommandeService } from 'src/app/service/bonde-commande.service';
import { OrganisationServiceService } from 'src/app/service/organisation-service.service';
import { SecteurService } from 'src/app/service/secteur.service';

@Component({
  selector: 'app-articlespecifiee',
  templateUrl: './articlespecifiee.component.html',
  styleUrls: ['./articlespecifiee.component.css']
})
export class ArticlespecifieeComponent implements OnInit {
  idBc!: any;
  bonDeCommande!: BondeCommande;
  articles!: Article;
  articlesUtilisees!: ArticleUtilisee[];
  

 
  constructor(private bonDeCommandeService:BondeCommandeService,private articleService:ArticleService,private articleUtiliseeService:ArticleUtiliseeService,private organisationService:OrganisationServiceService,private route:ActivatedRoute,
    private router:Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(res=>{
      this.idBc=res.get('id');
      console.log("id recuperee"+this.idBc);
      this.onGetBonDeCommandeById(this.idBc);
    })
   
  
  }

  //récuperer la bonDeCommande recus
  public onGetBonDeCommandeById(idBC:number):void{
    this.bonDeCommandeService.getBCbyId(idBC).subscribe({
      next: (response:BondeCommande) => {
        this.bonDeCommande=response;
        this.onGetEntrepoByBC(this.bonDeCommande);
        console.log(" code du bc recus :   "+this.bonDeCommande.codebc);
       
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);

       },
      complete: () => console.info('recus bc  complete') 
  })
}

//récuperer les articlesUtilisées par bc
public onGetArticlesUtilisees(idBC:number):void{
  this.articleUtiliseeService.getArticlesUtiliseesbyBC(idBC).subscribe({
    next: (response:ArticleUtilisee[]) => {
      this.articlesUtilisees=response;
      console.log(" prix du premier article utilisee :   "+this.articlesUtilisees[0].prix);
     
    },
    error: (error:HttpErrorResponse) => {
      alert(error.message);

     },
    complete: () => console.info('get ariclesUtilisees complete') 
})
}

  //récuperer les articles
  public onGetArticlebyArticleUtilisee(articleUtilisee:ArticleUtilisee):void{
    this.articleService.getArticlebyId(articleUtilisee.id.article_id).subscribe({
      next: (response:Article) => {
        
        //console.log(" code du bc recus :   "+this.bonDeCommande.codebc);
       
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);

       },
      complete: () => console.info('recus bc  complete') 
  })
}

 //récuperer l'entreprise par Bon de Commande
 public onGetEntrepoByBC(bonDeCommande:BondeCommande):void{
  this.organisationService.getOrganisationbyBonDeCommande(bonDeCommande.id).subscribe({
    next: (response:Organisation) => {
      bonDeCommande.nomEntreprise=response.nom;
      console.log(" nom d'entreprise cherché :   "+bonDeCommande.nomEntreprise);
     
    },
    error: (error:HttpErrorResponse) => {
      alert(error.message);

     },
    complete: () => console.info('get entreprise complete') 
})
}
  

 
  


}
