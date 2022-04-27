import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Article } from 'src/app/model/Article';
import { ArticleUtilisee } from 'src/app/model/ArticleUtilisee';
import { BondeCommande } from 'src/app/model/BondeCommande';
import { Organisation } from 'src/app/model/Organisation';
import { ArticleRService } from 'src/app/service/article-r.service';
import { BondeCommandeService } from 'src/app/service/bonde-commande.service';
import { LoginService } from 'src/app/service/login.service';
import { OrganisationServiceService } from 'src/app/service/organisation-service.service';


@Component({
  selector: 'app-articlespecifiee',
  templateUrl: './articlespecifiee.component.html',
  styleUrls: ['./articlespecifiee.component.css']
})
export class ArticlespecifieeComponent implements OnInit {
  idBc!: any;
  bonDeCommande!: BondeCommande;
  articles!: Article[];
  entreprise!: Organisation;
  username!: string;
  organisationConnectee!: Organisation;
 
  

 
  constructor(private bonDeCommandeService:BondeCommandeService,private articleReliseeService:ArticleRService,private route:ActivatedRoute,
    private router:Router,private organisationService:OrganisationServiceService,private loginService:LoginService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(res=>{
      this.idBc=res.get('id');
      console.log("id recuperee"+this.idBc);
      this.onGetBonDeCommandeById(this.idBc);
    })
    this.onGetOrganisationbyUser();
   
  
  }

  //récuperer la bonDeCommande recus
  public onGetBonDeCommandeById(idBC:number):void{
    this.bonDeCommandeService.getBondeCommandeJoinbybcId(idBC).subscribe({
      next: (response:BondeCommande) => {
        this.bonDeCommande=response;
        console.log(" code du bc recus :   "+this.bonDeCommande.codebc);
        this.onGetArticlesUtilisees(idBC);
        this.onGetEntreprise(response.nomEntrep);
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);

       },
      complete: () => console.info('recus bc  complete') 
  })
}

//récuperer les articlesUtilisees par bc
public onGetArticlesUtilisees(idBC:number):void{
  this.articleReliseeService.getArticlesUtiliseesbybcId(idBC).subscribe({
    next: (response:Article[]) => {
      this.articles=response.sort((a, b) => (a.typeLib > b.typeLib) ? 1 : -1);
      console.log(" prix du premier article utilisee :   "+this.articles[0].prix);
     
    },
    error: (error:HttpErrorResponse) => {
      alert(error.message);

     },
    complete: () => console.info('get ariclesRealisees complete') 
})
}

//récuperer les articlesRealisees par bc
public onGetEntreprise(nomOrg:string):void{
  this.organisationService.getOrganisationbyNom(nomOrg).subscribe({
    next: (response:Organisation) => {
      this.entreprise=response;
     
    },
    error: (error:HttpErrorResponse) => {
      alert(error.message);

     },
    complete: () => console.info('get entreprise complete') 
})
}

 
  //récuperer l'organisation connecté actuellement
  public onGetOrganisationbyUser():void{
    this.username=this.loginService.loggedUser;
    this.organisationService.getOrganisationbyUserName(this.username).subscribe({
      next: (response:Organisation) => {
        this.organisationConnectee=response;
        console.log("organisation conectee"+this.organisationConnectee);
      
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);

       },
      complete: () => console.info('complete') 
  })
  }


  

 
  


}
