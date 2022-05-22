import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/model/Article';
import { BondeCommande } from 'src/app/model/BondeCommande';
import { OrdreDefinitif } from 'src/app/model/OrdreDefinitif';
import { OrdreDeTraveaux } from 'src/app/model/OrdreDeTraveaux';
import { Organisation } from 'src/app/model/Organisation';
import { User } from 'src/app/model/User';
import { ArticleService } from 'src/app/service/article.service';
import { BondeCommandeService } from 'src/app/service/bonde-commande.service';
import { LoginService } from 'src/app/service/login.service';
import { OrdreDeTraveauxService } from 'src/app/service/ordre-de-traveaux.service';
import { OrdreDefinitifService } from 'src/app/service/ordre-definitif.service';
import { OrganisationServiceService } from 'src/app/service/organisation-service.service';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-affichr-liste-otmc',
  templateUrl: './affichr-liste-otmc.component.html',
  styleUrls: ['./affichr-liste-otmc.component.css']
})
export class AffichrListeOTmcComponent implements OnInit {
  listeOT!:OrdreDeTraveaux[]
  id!:number
  bondeCommande!:BondeCommande
  ordresDefinitives!:OrdreDefinitif[];
  article!:Article
  organisation!:Organisation
  username!:string
  user!:User
  idOrgan!:number
  terme:any;
  page:number = 1;
  totalLength:any;
  constructor( private register:RegisterService, public loginService:LoginService,  public organisationService:OrganisationServiceService,private articleService:ArticleService, private ordrDefService:OrdreDefinitifService,private router:Router,private ordreService:OrdreDeTraveauxService,private route:ActivatedRoute, private BCService:BondeCommandeService) { }

  ngOnInit(): void {
    this.username=this.loginService.loggedUser
    this.id=this.route.snapshot.params['id'];
    this.bondeCommande=new BondeCommande();
    this.BCService.getBCbyId(this.id).subscribe(
      data=>{
        this.bondeCommande=data;
        this.getListeOT(this.id)
        console.log(this.bondeCommande)
       
      }
    )
    this.findOrganisation(this.username);

  }

  // get liste des ot 
  getListeOT(id: number){
    this.ordreService.getOTbyBCid(id).subscribe({
      next: (response:OrdreDeTraveaux[]) => {
        this.totalLength=response.length;
        this.listeOT=response
    },
    error: (error:HttpErrorResponse) => {
      console.log(error.message);
     // alert("vous n'etes plus attaché a une organisation")
     },
    complete: () => console.info('complete') 
  })
  
  }


  // trouver la iste des ordres definitives d'une Ot donnée
  getListeOrdresDeffinitives(id:number){
this.ordrDefService.getOTbyOTid(id).subscribe({
  next: (response:OrdreDefinitif[]) => {
    this.totalLength=response.length;
    this.ordresDefinitives=response
    console.log(this.ordresDefinitives)
    for(let i=0;i<this.ordresDefinitives.length;i++){
      console.log(this.ordresDefinitives[i].id.article_id)
      console.log(this.ordresDefinitives[i].id.ordreDeTraveauxId_id)
this.articleService.getArticlebyId(this.ordresDefinitives[i].id.article_id).subscribe({
  next: (response:Article) => {
   this. article=response
 console.log (this.article.code)
 this.ordresDefinitives[i].code=this.article.code  
 this.ordresDefinitives[i].designiation=this.article.designation
 this.ordresDefinitives[i].unitee=this.article.unitee
 
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

  OpenModalListeORdreDeffinitive(id:number){
    this.getListeOrdresDeffinitives(id)
    const container=document.getElementById('container');
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    button.setAttribute('data-target','#listeODef');
    container?.appendChild(button);
    button.click();
  }
  versAttachemntMC(id:number){
    this.router.navigate(['mycpm/MCattachement',id])
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

  
  openImprimerListeOTModal(){
    const container=document.getElementById('container');
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    button.setAttribute('data-target','#imprimerlisteOT');
    container?.appendChild(button);
    button.click();
  }
}
