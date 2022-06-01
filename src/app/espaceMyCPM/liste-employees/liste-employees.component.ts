import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Organisation } from 'src/app/model/Organisation';
import { User } from 'src/app/model/User';
import { LoginService } from 'src/app/service/login.service';
import { OrganisationServiceService } from 'src/app/service/organisation-service.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-liste-employees',
  templateUrl: './liste-employees.component.html',
  styleUrls: ['./liste-employees.component.css']
})
export class ListeEmployeesComponent implements OnInit {
  userAff!:User[];
  organisation!:Organisation
  username!:string
  user!:User
  terme:any;
  page:number = 1;
  totalLength:any;
  idUser!:number
  constructor( private router :Router,public  service:UserService,public loginService:LoginService,private orgService:OrganisationServiceService) { }

  ngOnInit(): void {
   
this.getOrg();


  }
  ok(){
    console.log(this.organisation.code)
    console.log(this.userAff)
  }
  getEmployeesOfOrg(){
    this.service.findUsersOfOneOrg(this.organisation.code).subscribe({
      next: (response:any) => {
       console
        this.userAff=response;
        console.log(this.userAff)
       },
                error: (error:HttpErrorResponse) => {
                  alert(error.message);
                 },
                complete: () => console.info('complete') 
          
            })
  }

getOrg(){
  this.username=this.loginService.loggedUser;
  this.loginService.getUser(this.username).subscribe({
   next: (response:User) => {
     this.user=response;
     console.log(this.user)
     console.log("user is "+this.user);
     console.log("user is "+this.user.id);
     //get Organisation By user id
     this.orgService.getOrganisationbyUser(this.user.id).subscribe({
     next: (response:Organisation) => {
          this.organisation=response;
          this.getEmployeesOfOrg()
          console.log("organisation"+response);
          console.log("organisation"+this.organisation.id);
        },
        error: (error:HttpErrorResponse) => {
          alert(error.message);
         },
        complete: () => console.info('complete') 
  
    })
  },
  error: (error:HttpErrorResponse) => {
    alert(error.message);
   },
  complete: () => console.info('complete') 

})

}


onOpenDetailModal(id:number){
  this.router.navigate(['userDetail',id])
}


onOpenDeleteAllModal()
{

      const container=document.getElementById('main-container');
      const button=document.createElement('button');
      button.type='button';
      button.style.display='none';
      button.setAttribute('data-toggle','modal');
      button.setAttribute('data-target','#deleteAllEmployeeModal');
      container?.appendChild(button);
      button.click();
      
  

}


public onOpenDeleteModal(id:number):void{
  this.service.getUserById(id).subscribe({
    next: (response:User) => {
     this.user=response;
      this.idUser=this.user.id
      const container=document.getElementById('main-container');
      const button=document.createElement('button');
      button.type='button';
      button.style.display='none';
      button.setAttribute('data-toggle','modal');
      button.setAttribute('data-target','#delete');
      container?.appendChild(button);
      button.click();
      
    },
    error: (error:HttpErrorResponse) => {
      alert(error.message);
     },
    complete: () => console.info('complete') 
   
  })
   
}


supprimer(){
 let id =this.idUser
 this.service.DeleteUser(id).subscribe({
    next: (response:void) => {
    console.log("suuuuup")
    this.getEmployeesOfOrg()
    },
    error: (error:HttpErrorResponse) => {
      
      alert("nnnnn")
     },
    complete: () => console.info('complete') 
   
  })
  

}


SupprimerTous(){
let x= this.userAff.length
if ( x==null){
alert(" deja liste vide ")
}

this.service.DeleteOrg_users(this.organisation.id).subscribe({
    next: (response:void) => {
      console.log("tous les element sont supprimé")
      this.getEmployeesOfOrg()
      alert("suppression avec succé")
      },
      error: (error:HttpErrorResponse) => {
       
        alert("supprimer tous invalide")
       },
      complete: () => console.info('complete') 
  })
}

  }
