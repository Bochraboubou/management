import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Organisation } from 'src/app/model/Organisation';
import { Role } from 'src/app/model/Role';
import { User } from 'src/app/model/User';
import { LoginService } from 'src/app/service/login.service';
import { OrganisationServiceService } from 'src/app/service/organisation-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  idOrganisation!:number;
idUser!:number;
  user= new User();
  msg='';
  code_org!:string;
  organisation =new Organisation();
  roleu!:Role;
  constructor(private _route:Router,private service:LoginService,private router:Router, private OrganisationService:OrganisationServiceService) { }

  ngOnInit(): void {
    

  }
  
  loginUser(){
  this.service.guestLogin(this.user).subscribe({
      next: (response:User) => {
        this.user=response;
        this.idUser=this.user.id;
       console.log(this.user.roles[1]?.name)
        console.log("votre id est : "+this.idUser);
        console.log("votre role est : "+this.roleu);

        this.OrganisationService.getOrganisationbyUser(this.idUser).subscribe({
          next:(response:Organisation)=>{
            this.organisation=response;
           this.idOrganisation=this.organisation.id;
           
           console.log("votre code d'organisation  est : "+this.idOrganisation);
           this.router.navigate(['cpm',this.idOrganisation]);
          }
        })
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);
       },
      complete: () => console.info('complete') 
  })
}
  



/*
  loginUser(){

     this.service.guestLogin(this.user).subscribe(
      data=>{
        console.log("accept");
      
        this.service.getUser(this.user.username).subscribe((response:User) => 
        {  
          this.user = response;
          console.log(this.user);
          console.log(this.user.email);
          console.log(this.user.id);

        
     this.router.navigate(['mycpm',5]);
     
       } ,
       error =>{
        this.msg=" codeorg";
        console.log("user not exist",this.user.username,this.user.password);
      }
        );
      },  
    
    error =>{
      this.msg=" erreuur";
      console.log("user not exist",this.user.username,this.user.password);
    }
      );
  } 
*/

}
