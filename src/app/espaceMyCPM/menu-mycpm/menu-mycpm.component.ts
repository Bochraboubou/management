import { HttpErrorResponse } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js';
import { ArticleUtilisee } from 'src/app/model/ArticleUtilisee';
import { Organisation } from 'src/app/model/Organisation';
import { User } from 'src/app/model/User';
import { BondeCommandeService } from 'src/app/service/bonde-commande.service';


//import { BondeCommandeService } from '../service/bonde-commande.service';
import { LoginService } from 'src/app/service/login.service';
import { OrganisationServiceService } from 'src/app/service/organisation-service.service';
import { RegisterService } from 'src/app/service/register.service';
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
username!:string
  constructor( private userServi:UserService,
    private bcservice:BondeCommandeService ,
    private route:ActivatedRoute,
    public loginService:LoginService,
    public Service:UserService,
    public  OrganisationService:OrganisationServiceService,
    private register:RegisterService, private router:Router) { }

  ngOnInit(): void {

    this.username=this.loginService.loggedUser
 this.register.findByUserName(this.username).subscribe(
  data=>{
    this.user=data;
    this.OrganisationService.getOrganisationbyUser(this.user.id).subscribe({
      next: (response:Organisation) => {
        this.organisation=response;
        console.log("organisation"+response);
        this.idOrganisation=this.organisation.id;
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
  this.getOrganisation()
  }

  onAfficheDetailOrganisation(id:number){
    this.router.navigate(['DetailOrg',id])
  }

  getOrganisation(){
    this.OrganisationService.getOrganisationbyUser(this.user.id).subscribe({
      next: (response:Organisation) => {
        this.organisation=response;
        console.log("organisation"+response);
        this.idOrganisation=this.organisation.id;
      
      },
      error: (error:HttpErrorResponse) => {
        console.log(error.message);
       // alert("vous n'etes plus attaché a une organisation")
       },
      complete: () => console.info('complete') 
    })
  }
    
  }

/*
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

}
*/



 /*
   
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
  onAfficheDetailOrganisation(id:number){
    this.router.navigate(['DetailOrg',id])
  } 

}
*/
  
