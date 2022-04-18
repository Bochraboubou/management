import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Attachement } from 'src/app/model/Attachement';
import { Organisation } from 'src/app/model/Organisation';
import { User } from 'src/app/model/User';
import { ArticleUtiliseeService } from 'src/app/service/article-utilisee.service';
import { ArticleService } from 'src/app/service/article.service';
import { AttachementService } from 'src/app/service/attachement.service';
import { BondeCommandeService } from 'src/app/service/bonde-commande.service';
import { LoginService } from 'src/app/service/login.service';
import { MarcheeService } from 'src/app/service/marchee.service';
import { MetierService } from 'src/app/service/metier.service';
import { OrganisationServiceService } from 'src/app/service/organisation-service.service';
import { RegisterService } from 'src/app/service/register.service';
import { SecteurService } from 'src/app/service/secteur.service';
import { UniteeMonneeService } from 'src/app/service/unitee-monnee.service';

@Component({
  selector: 'app-imprimer-attachement',
  templateUrl: './imprimer-attachement.component.html',
  styleUrls: ['./imprimer-attachement.component.css']
})
export class ImprimerAttachementComponent implements OnInit {
date=new Date()
idOrgan!:number
id!:number
attachement!:Attachement
username!:string
user=new User()
 organisation!:Organisation
  constructor(private organService:OrganisationServiceService,
    private secteurService:SecteurService,private metierService:MetierService,
    private marcheeService:MarcheeService,
    private bondeCommandeService:BondeCommandeService,
    private articleService:ArticleService,
    private articleUtiliseeService:ArticleUtiliseeService,
    private organisationService:OrganisationServiceService,
 
    private uniteeMonneeService:UniteeMonneeService
    ,private register:RegisterService,
    private attachementService:AttachementService,public loginService:LoginService, private activeRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.username=this.loginService.loggedUser
    console.log(this.username)
    this.id=this.activeRoute.snapshot.params['id'];
    this.attachement=new Attachement();
    this.attachementService.getAttachementById(this.id).subscribe(
      data=>{
        this.attachement=data;

      }
    )
    this.findOrganisation(this.username);
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
}
