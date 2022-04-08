import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Organisation } from 'src/app/model/Organisation';
import { Role } from 'src/app/model/Role';
import { User } from 'src/app/model/User';
import { LoginService } from 'src/app/service/login.service';
import { OrganisationServiceService } from 'src/app/service/organisation-service.service';
import { RegisterService } from 'src/app/service/register.service';
import { RoleService } from 'src/app/service/role.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
username!:string
user=new User()
roles!:Role[]
organisation!:Organisation
  constructor(private organisationservice:OrganisationServiceService, private roleService:RoleService,public Service:UserService,private registerServ:RegisterService,public loginService:LoginService) { }

  ngOnInit(): void {
    this.username=this.loginService.loggedUser
    this.registerServ.findByUserName(this.username).subscribe({
      next: (response:User) => {
        this.user=response;


        this.roleService.findRoleOfUser(this.user.id).subscribe({
          next: (response:Role[]) => {
            this.roles=response;
            this.user.nomRole=this.roles[0]?.name
            console.log(this.user.nomRole)
            //this.onGetCodeOrganisation()
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

public onGetCodeOrganisation(){
  this.organisationservice.getOrganisationbyUser(this.user.id).subscribe({
    next: (response:Organisation) => {
      this.organisation=response;
      console .log("aaaaaaaaaaaaaa")
      this.user.code=this.organisation.code;
      console.log("le code de l'organisation est"+this.user.code)
      //console.log("le code de l'organisation est"+this.code)
    },
    error: (error:HttpErrorResponse) => {
      alert(error.message);
      alert("ttttttttt")

     },
    complete: () => console.info('complete') 
}) 
}   



} 
      
     


  