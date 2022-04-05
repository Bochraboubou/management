import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
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

  constructor( public service:UserService, private router:Router) { }

  ngOnInit(): void {
    this.getUsers();
  }
getUsers():void{


  this.service.getAllUsers().subscribe({
    next: (response:User[]) => {
      this.users=response;
      console.log("organisation"+response);
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
