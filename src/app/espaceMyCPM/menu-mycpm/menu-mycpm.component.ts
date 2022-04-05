import { HttpErrorResponse } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ArticleUtilisee } from 'src/app/model/ArticleUtilisee';
import { Organisation } from 'src/app/model/Organisation';
import { User } from 'src/app/model/User';
import { BondeCommandeService } from 'src/app/service/bonde-commande.service';


//import { BondeCommandeService } from '../service/bonde-commande.service';
import { LoginService } from 'src/app/service/login.service';
import { OrganisationServiceService } from 'src/app/service/organisation-service.service';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-menu-mycpm',
  templateUrl: './menu-mycpm.component.html',
  styleUrls: ['./menu-mycpm.component.css']
})
export class MenuMycpmComponent implements OnInit {
  artsuts!: ArticleUtilisee[];
  id!:number;
organisation=new Organisation()
org=new Organisation();
orgId!:number;
user!:User;
idOrganisation!:number;
  constructor( private userServi:UserService,
    private bcservice:BondeCommandeService ,
    private route:ActivatedRoute,
    public loginService:LoginService,
    private OrganisationService:OrganisationServiceService) { }

  ngOnInit(): void {

    //pour connaitre le code de l'organisation 
    this.id=this.route.snapshot.params['id'];
    this.user=new User();
    //find user
this.userServi.getUserById(this.id).subscribe(
  data=>{
    this.user=data;
  }
 )
    console.log("user is :"+this.user)
    console.log( "logged user is "+this.loginService.loggedUser);
    console.log( "ya nour rani f mycpm "+this.loginService.loggedUser);
}


  info(){
    this.OrganisationService.getOrganisationbyUser(this.user.id).subscribe({
      next: (response:Organisation) => {
        this.organisation=response;
        console.log("organisation"+response);
        this.idOrganisation=this.organisation.id;
        console.log(this.idOrganisation)
        alert("vous etes attache a "+this.organisation.nom)
        alert("l 'id de l'organisation est "+this.organisation.id)
        //this.router.navigate(['mycpm',this.user.id]);
      },
      error: (error:HttpErrorResponse) => {
        console.log(error.message);
       // alert("vous n'etes plus attaché a une organisation")
       },
      complete: () => console.info('complete') 
    })

    console.log(this.id)
    console.log(this.organisation)
    console.log(this.user)
    console.log("l id de lorganisation est :"+this.organisation.id)
    console.log("l id du user est :"+this.user.id)
   
  }
  showme():void{
      this.bcservice.getArticlesUtilisees().subscribe({
        next: (response:ArticleUtilisee[]) => {
          this.artsuts=response;
          console.log(response);

          console.log("id bc est   "+this.artsuts[1].id.bondecommande_id);
          console.log("id bc est   "+this.artsuts[1].id.article_id);
          

          
        },
        error: (error:HttpErrorResponse) => {
          alert(error.message);
         },
        complete: () => console.info('complete') 
    })

  }

}
