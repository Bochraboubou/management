import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  constructor(public  service:UserService,public loginService:LoginService,private orgService:OrganisationServiceService) { }

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

supprimer(id:number){

}
onOpenDetailModal(id:number){

}
onOpenDeleteModal(id:number){
  
}
onOpenDeleteAllModal()
{

}
  }
