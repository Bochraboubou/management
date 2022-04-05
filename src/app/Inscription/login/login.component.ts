import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Organisation } from 'src/app/model/Organisation';
import { Role } from 'src/app/model/Role';
import { User } from 'src/app/model/User';
import { LoginService } from 'src/app/service/login.service';
import { OrganisationServiceService } from 'src/app/service/organisation-service.service';
import { RoleService } from 'src/app/service/role.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  
})
export class LoginComponent implements OnInit {
  idOrganisation!:number;
idUser!:number;
  user=new User();
  msg='';
  code_org!:string;
  organisation =new Organisation();
  roleu!:Role;
  role!:Role;
  erreur=0;
  public loggedUser!:string;
public isloggedIn: Boolean = false;
public roles!:Role[];
alertstop=0;
trole!:Role[];

constructor(
 
  public loginService :LoginService,
  private roleServ:RoleService,
  private _route:Router,private service:LoginService,
  private router:Router,
   private OrganisationService:OrganisationServiceService) { }

  ngOnInit(): void {
    
     }

  
loginUser(){
      
      this.service.guestLogin(this.user).subscribe({
        next: (response:User) => {
          this.user=response;
          console.log("user"+response);
         console.log("user id "+this.user.id);
         console.log("roooooooole "+this.user.roles);
         this.loginService.signIn(this.user);
         console.log(this.loginService.loggedUser);
       //
       this.roleServ.findRoleOfUser(this.user.id).subscribe({
        next: (response:Role[]) => {
          this.roles=response;
          console.log("les roles sont "+response);
          this.loginService.roles=this.roles;
          console.log("les roles daons loginService sont"+this.loginService.roles)
          console.log(this.loginService.roles);
          console.log(this.roles);
          console.log("le role est:"+this.loginService. isChefProjet())
          if(this.roles[0]?.name=="SIMPLE"){
            this.alertstop=1
           
          }else
          if(this.roles[0]?.name=="ADMIN-CPM"){
            console.log("jjjjjj")
            this.router.navigate(['cpm']);
          }else
          if(this.roles[0]?.name=="ADMIN_MYCPM"){
            console.log("vvv")
            this.router.navigate(['mycpm']);
            
          }
          else {
            this.router.navigate(['mycpm']);
            //this.router.navigate(['cpm',this.user.id]);
         }
        },
        error: (error:HttpErrorResponse) => {
          alert(error.message);
         },
        complete: () => console.info('complete') 
    })
 },
        error: (error:HttpErrorResponse) => {
          console.log(error.message);
          //alert("verifier votre login et mot de passe ")
          this.erreur=1;
         },
        complete: () => console.info('complete') 
    })

  }
  

trouverRole(idUser:number){
  this.roleServ.findRoleOfUser(idUser).subscribe({
    next: (response:Role[]) => {
      this.roles=response;
      console.log("les roles sont "+response);
    },
    error: (error:HttpErrorResponse) => {
      alert(error.message);
     },
    complete: () => console.info('complete') 
})



}
/*

  
loginUser(){
      
      this.service.guestLogin(this.user).subscribe({
        next: (response:User) => {
          this.user=response;
          console.log("user"+response);
         console.log("user id "+this.user.id);
      
         this.loginService.signIn(this.user);
         console.log(this.loginService.loggedUser);
       //
       this.roleServ.findRoleOfUser(this.user.id).subscribe({
        next: (response:Role[]) => {
          this.roles=response;
          console.log("les roles sont "+response);
          console.log(this.roles)
          if(this.roles[0]?.name=="SIMPLE"){
            this.alertstop=1
           
          }
          if(this.roles[0]?.name=="ADMIN-CPM"){
            console.log("jjjjjj")
            this.router.navigate(['cpm',this.user.id]);
          }
          if(this.roles[0]?.name=="ADMIN_MYCPM"){
            console.log("vvv")
            this.router.navigate(['mycpm',this.user.id]);
          }
        },
        error: (error:HttpErrorResponse) => {
          alert(error.message);
         },
        complete: () => console.info('complete') 
    })
 },
        error: (error:HttpErrorResponse) => {
          console.log(error.message);
          //alert("verifier votre login et mot de passe ")
          this.erreur=1;
         },
        complete: () => console.info('complete') 
    })

  }
*/




















/*
loginUser(){
  this.service.guestLogin(this.user).subscribe({
      next: (response:User) => {
        this.user=response;
        this.idUser=this.user.id;
        console.log(this.user.id)
        // affiche indefind
      // console.log("votre role est"+this.user.roles[4]?.id)
       // console.log("votre id est : "+this.trouverRole(this.idUser));
  console .log("votre role est :"+this.user.role)

if ( this.user.role=="ADMIN_CPM"){
  this.router.navigate(['cpm']);
}else
{}
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
        alert( "verifier votre pass et login")
       },
      complete: () => console.info('complete') 
  })

  }
 */

















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
