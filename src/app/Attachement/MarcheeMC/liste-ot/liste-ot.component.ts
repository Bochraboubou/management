import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/model/Article';
import { BondeCommande } from 'src/app/model/BondeCommande';
import { OrdreDefinitif } from 'src/app/model/OrdreDefinitif';
import { OrdreDeTraveaux } from 'src/app/model/OrdreDeTraveaux';
import { ArticleService } from 'src/app/service/article.service';
import { BondeCommandeService } from 'src/app/service/bonde-commande.service';
import { OrdreDeTraveauxService } from 'src/app/service/ordre-de-traveaux.service';
import { OrdreDefinitifService } from 'src/app/service/ordre-definitif.service';

@Component({
  selector: 'app-liste-ot',
  templateUrl: './liste-ot.component.html',
  styleUrls: ['./liste-ot.component.css']
})
export class ListeOTComponent implements OnInit {
  listeOT!:OrdreDeTraveaux[]
  id!:number
  bondeCommande!:BondeCommande
  ordresDefinitives!:OrdreDefinitif[];
  article!:Article
  x=this.ordresDefinitives?.length
  terme:any;
  page:number= 1;
  totalLength:any;
  constructor( private articleService:ArticleService, private ordrDefService:OrdreDefinitifService,private router:Router,private ordreService:OrdreDeTraveauxService,private route:ActivatedRoute, private BCService:BondeCommandeService) { }

  ngOnInit(): void {
    //this.username=this.loginService.loggedUser
    this.id=this.route.snapshot.params['id'];
    this.bondeCommande=new BondeCommande();
    this.BCService.getBCbyId(this.id).subscribe(
      data=>{
        this.bondeCommande=data;
        this.getListeOT(this.id)
        console.log(this.bondeCommande)
       
      }
    )

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
    button.setAttribute('data-target','#listeDef');
    container?.appendChild(button);
    button.click();
  }
  versAttachemntMC(id:number){
    this.router.navigate(['mycpm/MCattachement',id])
  }
}
