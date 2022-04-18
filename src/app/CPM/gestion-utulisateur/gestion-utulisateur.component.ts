import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/model/Role';
import { User } from 'src/app/model/User';
import { RoleService } from 'src/app/service/role.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-gestion-utulisateur',
  templateUrl: './gestion-utulisateur.component.html',
  styleUrls: ['./gestion-utulisateur.component.css']
})
export class GestionUtulisateurComponent implements OnInit {
users!:User[];
user!:User;
deleteUser!:User
sppalerte!:number
edituser!:User
suptous=0
terme:any;
page:number = 1;
totalLength:any;
role!:Role;
roles!:Role[];
nomRole:string="";
  constructor(private roleService:RoleService,public service:UserService, private router:Router) { }

  ngOnInit(): void {
    this.getUsers();
  

  }
public onGetRoles(id:number):void{
    this.roleService.findRoleOfUser(this.user.id).subscribe({
      next: (response:Role[]) => {
        this.roles=response;
        this.nomRole=this.roles[0]?.name
        console.log("votre roleeeeeeeeeeeeee est "+this.nomRole)
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);
  
       },
      complete: () => console.info('complete') 
  })
  } 
/*
  public roleOfUser(id:number):any{
    this.roleService.findRoleOfUser(id).subscribe({
      next: (response:Role[]) => {
        this.roles=response;
        this.nomRole=this.roles[0]?.name
        return this.nomRole;
        
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);
        return"nn"
  
       },
      complete: () => console.info('complete') 
  })
  } */
  public onGetroleUser(user:User){
    let id=user.id
    console.log("iiiiiiiiiii"+id)
    this.roleService.findRoleOfUser(user.id).subscribe({
      next: (response:Role[]) => {
        this.roles=response;
        console.log(this.roles)
        console.log(this.roles[0]?.name)
        this.nomRole=this.roles[0]?.name
        console.log(this.nomRole)
        user.nomRole=this.roles[0]?.name
         console .log("aaaaaaaaaaaaaa")
      
       
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);
        alert("ttttttttt")
  
       },
      complete: () => console.info('complete') 
  }) 
  }

getUsers():void{
this.service.getAllUsers().subscribe({
    next: (response:User[]) => {
      this.users=response;
      this.totalLength=response.length;
      for (let i = 0; i <this.users.length; i++){
       this.onGetroleUser(this.users[i]);
      }
    },
    error: (error:HttpErrorResponse) => {
      alert(error.message);
     },
    complete: () => console.info('complete') 
   
  })
 
}
onAfficheDetailUser(id:number){
  this.router.navigate(['userDetail',id])
}

public onOpenDeleteModal(id:number):void{
  this.service.getUserById(id).subscribe({
    next: (response:User) => {
      this.user=response;
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
public onOpenDeleteAllModal():void{
  const container=document.getElementById('main-container');
  const button=document.createElement('button');
  button.type='button';
  button.style.display='none';
  button.setAttribute('data-toggle','modal');
  button.setAttribute('data-target','#deleteAll');
  container?.appendChild(button);
  button.click();

}

supprimer(id:number){
 
 this.service.DeleteUser(id).subscribe({
    next: (response:void) => {
    console.log("suuuuup")
      this.sppalerte=1
      this.getUsers();
    },
    error: (error:HttpErrorResponse) => {
      this.sppalerte=0
      alert("nnnnn")
     },
    complete: () => console.info('complete') 
   
  })
  

}
spprimertous(){

this.service.DeleteAllUsers().subscribe({
    next: (response:void) => {
      console.log("tous les element sont supprimé")
        this.sppalerte=1
        this.getUsers();
      },
      error: (error:HttpErrorResponse) => {
        this.sppalerte=0
        alert("nnnnn")
       },
      complete: () => console.info('complete') 
  })
}

}
