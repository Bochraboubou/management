import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Organisation } from 'src/app/model/Organisation';

import { Role } from 'src/app/model/Role';
import { User} from 'src/app/model/User';
import { LoginService } from 'src/app/service/login.service';
import { OrganisationServiceService } from 'src/app/service/organisation-service.service';
import { RegisterService } from 'src/app/service/register.service';
import { RoleService } from 'src/app/service/role.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-gerer-comptes',
  templateUrl: './gerer-comptes.component.html',
  styleUrls: ['./gerer-comptes.component.css']
})
export class GererComptesComponent implements OnInit {
  public addRole!:User;
  id_org!:number;
 userId!:number
  username!:string;
  user!:User;
  organisation!:Organisation
  users!:User[]
  roles!:Role[]
  role!:Role;
  user2!:User
  erreur=0;
  good!: number;
  liste2!:Array<Role>;
  sppalerte=0
  terme:any;
  page:number = 1;
  totalLength:any;
  constructor(public service:UserService,private registerService:RegisterService, private roleService:RoleService,private orgService:OrganisationServiceService, public loginService:LoginService) { }

  ngOnInit(): void {
    let liste:Role[];
 
this.roleService.findAll().subscribe({
  next: (response:Role[]) => {
    this.roles=response;
  
  },
  error: (error:HttpErrorResponse) => {
    alert(error.message);
   },
  complete: () => console.info('complete') 

})

this.username=this.loginService.loggedUser

this.getEmployees()
this.listeRoles()

}


 
getEmployees(){

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
          console.log("organisation"+response);
          console.log("organisation"+this.organisation.id);

          this.loginService.getNewEmployees(this.organisation.id).subscribe({
            next: (response:User[]) => {
                this.users=response;
                this.totalLength=response.length;
                console.log("users are ::"+response);
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
     

   },
   error: (error:HttpErrorResponse) => {
     alert(error.message);
    },
   complete: () => console.info('complete') 
})


}




public onOpenModal(id:number, mode: string): void {
  const container = document.getElementById('container');
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle','modal');
  
  if (mode ==='edit') {
    
    button.setAttribute('data-target', '#addroleModal');
  }/*
  if (mode ==='supprimer') {
    //this.addRole = user;
    button.setAttribute('data-target', '#deleteEmployeeModal');
  }
  if (mode ==='supprimerTous') {
    //this.addRole = user;
    button.setAttribute('data-target', '#deleteAllEmployeeModal');
  }*/
  
  container?.appendChild(button);
  button.click();
}

onAddRole(form:NgForm){

console.log("username is "+form.value.username)
 
  console.log("role is"+form.value.name)
  this.loginService.AddRoleToEmployee(form.value.username,form.value.name).subscribe({
    next: (response:User) => {
      this.user=response;
      console.log("user is  ::"+response);
      this.good=1;
        
      
    },
    error: (error:HttpErrorResponse) => {
     this.erreur=1

     },
    complete: () => console.info('complete')
  })
  
}
/********************** */

public onOpenDeleteModal(id:number):void{
  this.service.getUserById(id).subscribe({
    next: (response:User) => {
      this.user=response;
      const container=document.getElementById('container');
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
public onOpenDeleteAllModal():void{
  const container=document.getElementById('container');
  const button=document.createElement('button');
  button.type='button';
  button.style.display='none';
  button.setAttribute('data-toggle','modal');
  button.setAttribute('data-target','#deleteAllEmployeeModal');
  container?.appendChild(button);
  button.click();

}

supprimer(id:number){
 
 this.service.DeleteUser(id).subscribe({
    next: (response:void) => {
    console.log("suuuuup")
      this.sppalerte=1
      this.getEmployees()
     
    },
    error: (error:HttpErrorResponse) => {
      this.sppalerte=0
      alert("nnnnn")
     },
    complete: () => console.info('complete') 
   
  })
  

}
spprimertous(){
/*
this.service.DeleteAllUsers().subscribe({
    next: (response:void) => {
      console.log("tous les element sont supprimé")
        this.sppalerte=1
     
      },
      error: (error:HttpErrorResponse) => {
        this.sppalerte=0
        alert("nnnnn")
       },
      complete: () => console.info('complete') 
  })*/
}



public onOpenAddRoleModal(id:number):void{
  this.service.getUserById(id).subscribe({
    next: (response:User) => {
      this.user=response;
      console.log("zzzzzzzzzzzzzz")
      console.log(this.user.username)
      const container=document.getElementById('container');
      const button=document.createElement('button');
      button.type='button';
      button.style.display='none';
      button.setAttribute('data-toggle','modal');
      button.setAttribute('data-target','#addroleModal');
      container?.appendChild(button);
      button.click();
      
    },
    error: (error:HttpErrorResponse) => {
      alert(error.message);
     },
    complete: () => console.info('complete') 
   
  })
 
}

Addrole(username:string,form:NgForm){
  console.log("nommm est "+username)

  console.log("role du modal  est"+form.value.name)
  this.loginService.AddRoleToEmployee(username,form.value.name).subscribe({
    next: (response:User) => {
      this.user=response;
      console.log("user is  ::"+response);
      this.getEmployees()
      this.good=1;
     
        
      
    },
    error: (error:HttpErrorResponse) => {
     this.erreur=1

     },
    complete: () => console.info('complete')
  })
}









listeRoles(){
   
   this.roleService.trouverRolesSaufadminEtSimple().subscribe({
    next: (response:Role[]) => {
      this.liste2=response
    console.log(" lesssssssssssssssssss roles sont:"+this.liste2) 
    console.log(this.liste2) 
      },
      error: (error:HttpErrorResponse) => {
        this.sppalerte=0
        alert("il y a une  erreur ")
       },
      complete: () => console.info('complete') 
  })

}
}


