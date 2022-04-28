import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BondeCommande } from 'src/app/model/BondeCommande';
import { Marchee } from 'src/app/model/Marchee';
import { Organisation } from 'src/app/model/Organisation';
import { User } from 'src/app/model/User';

import { BondeCommandeService } from 'src/app/service/bonde-commande.service';
import { LoginService } from 'src/app/service/login.service';
import { MarcheeService } from 'src/app/service/marchee.service';
import { OrganisationServiceService } from 'src/app/service/organisation-service.service';
import { RegisterService } from 'src/app/service/register.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-ajouterattachement',
  templateUrl: './ajouterattachement.component.html',
  styleUrls: ['./ajouterattachement.component.css']
})
export class AjouterattachementComponent implements OnInit {
  username!:string
  user=new User
  organisation =new Organisation
  idOrganisation!:number
  marchees!:Marchee[]
  oneMarchee!:Marchee[]
  terme:any;
  page:number = 1;
  totalLength:any;
  m=new Marchee()
  marchee=new Marchee()
   bondeCommandes!:BondeCommande[]
listesMarcheeProjet:Marchee[]=[]
  alertecodemarchee=0;
  constructor( private userServi:UserService,
    private bcservice:BondeCommandeService ,
    private route:ActivatedRoute,
    public loginService:LoginService,
    public Service:UserService,
    private OrganisationService:OrganisationServiceService,
    private register:RegisterService,
    private servMarchee:MarcheeService,
    private router:Router) { }

  ngOnInit(): void {
      this.username=this.loginService.loggedUser
      this.findUserOrganisationAndMarchees(this.username);
    }

    recherche(){
      console.log(this.m.code)
      this.servMarchee.getMarcheebyCode(this.m.code).subscribe({
      next: (response:Marchee) => {
        this.marchee=response
      // this.oneMarchee[0]=this.marchee
       console.log("aaaaaaaaaaaa")
       this.bcservice.getBCsByMarchee(this.marchee.id).subscribe({
        next: (response:BondeCommande[]) => {
          this.totalLength=response.length;
          this.totalLength=response.length;
          this.bondeCommandes=response  
          console.log("bbbbbbbbbbbb")
        },
        error: (error:HttpErrorResponse) => {
        
          console.log(error.message);
         // alert("vous n'etes plus attaché a une organisation")
         },
        complete: () => console.info('complete') 
      })
        
      },
      error: (error:HttpErrorResponse) => {
        this.alertecodemarchee=1
        console.log(error.message);
       // alert("vous n'etes plus attaché a une organisation")
       },
      complete: () => console.info('complete') 
    })
    }

//trouver  user ,l'organisation et la liste des marchées de cette organisation
findUserOrganisationAndMarchees(username:string){
  this.register.findByUserName(username).subscribe(
    data=>{
     this.user=data
    
     this.getOrganisationAndMarchee(this.user.id);

    })
}



getOrganisationAndMarchee(id:number){
  this.OrganisationService.getOrganisationbyUser(id).subscribe({
    next: (response:Organisation) => {
      this.organisation=response;
      console.log("organisation"+response);
      this.idOrganisation=this.organisation.id;
      console.log(this.organisation.id)
      this.servMarchee.getMarcheesbyorganisationId(this.organisation.id).subscribe({
        next: (response:Marchee[]) => {
          this.marchees=response
          this.marchees.forEach((curMarchee) => {
            if(curMarchee.type=="Projet"){
              this.listesMarcheeProjet.push(curMarchee)
            }
        
          })
        },
        error: (error:HttpErrorResponse) => {
          console.log(error.message);
         // alert("vous n'etes plus attaché a une organisation")
         },
        complete: () => console.info('complete') 
      })
    

    },
    error: (error:HttpErrorResponse) => {
      console.log(error.message);
     // alert("vous n'etes plus attaché a une organisation")
     },
    complete: () => console.info('complete') 
  })
}
//trouver la liste des marchees de type projet


detailBondeCommande(id:number){
  this.router.navigate(['mycpm/detailBondeCommande',id])
}

//une fois j'ai terminé je vais just changé les noms des méthodes: 

more(id:number){
  this.router.navigate(['mycpm/detailBC',id])
}
  }
   
   





