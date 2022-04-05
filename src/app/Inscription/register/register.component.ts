import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Prospect } from 'src/app/model/Prospect';
import { Role } from 'src/app/model/Role';
import { User } from 'src/app/model/User';
import { ProspectService } from 'src/app/service/prospect.service';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user= new User();
  prospect!:Prospect
  msg='';
  roles!:Role[];
  email!:string;
  idOrg!:number
  roleId!:number;
  user2!:User
  notification=0
  erreur=0
  


  constructor( private serviceProspect:ProspectService,private _service :RegisterService) { }

  ngOnInit(): void {
    
   
  }
  RegistryUser(){
//this.email=this.user.email;
//console.log(this.email)

this.trouverProspect(this.user.email,this.user.codeConfirmation,this.user.username)
   

  }



 
 trouverProspect(emailll:string,coode:string,username:string ){

  this._service.findByUserName(username).subscribe({
    next: (response:User) => {
     this.user2=response;
      console.log("user"+response);
      //console.log("user"+this.user2.id);
      if(this.user2!=null){
        alert(" username deja exisete");
      }else{
        console.log("username n existe pas ");
        this._service.findByEmail(emailll).subscribe({
          next: (response:User) => {
            this.user2=response;
            console.log("user"+response);
            if (this.user2!=null){
              alert("email deja utulise");
            }
            else {
              console.log("email n existe pas ")
              this.serviceProspect.trouverParEmailEtCode(emailll,coode).subscribe({
                next: (response:Prospect) => {
                  this.prospect=response;
                  console.log("prospect"+response);
                  if (this.prospect==null){
                    alert("vous devez s'inscrire");
                  }
                  else{
                    this._service.RegisterFromRemote(this.user,this.prospect.id_org,this.prospect.id_role).subscribe({
                      next: (response:User) => {
                        this.user=response;
                        this.notification=1;
                       /* if(this.user!=null){
                          alert( "inscription avec suucces ")
                        console.log("user"+response+"bien ajouter ");
                      }else {
                        console.log("user"+response+"n'est pas ajouter ajouter ");
                      }*/
                      },
                      error: (error:HttpErrorResponse) => {
                        this.erreur=1
                        alert(error.message)
                       },
                      complete: () => console.info('complete') 
                  })
                    
                  }
                },
                error: (error:HttpErrorResponse) => {
                  alert(error.message);
                 },
                complete: () => console.info('complete') 
            })

            }
          },
          error: (error:HttpErrorResponse) => {
            alert(error.message);
           },
          complete: () => console.info('complete') 
      })
      }
    },
    error: (error:HttpErrorResponse) => {
      alert(error.message);
     },
    complete: () => console.info('complete') 
})

   /* this.serviceProspect.trouverParEmailEtCode(emailll,coode).subscribe
    ( (data:Prospect)=>{console.log(data);
      this.prospect=data ;
      alert("user bien inscrit")
      this.idOrg=this.prospect.id_org
      this.roleId=this.prospect.id_role;
      //console.log(this.idOrg)
      //console.log(this.roleId)
      console.log(this.user)
      this._service.RegisterFromRemote(this.user,this.idOrg,this.roleId).subscribe(
        (data:User)=>{console.log(data)
        this.user=data
        alert(this.user.username+"bienvennue chez CPM-Group")
      },
      (error:any)=>{
        console.log(error)
        alert("erreur !")
      }
      
      )

    
  },
  ( error: any) =>{
   console.log(error)
  alert(" vous n'etes plus inscrit")}
   )*/
 
  }

///////
public onGetRoles():void{
  this._service.getRoles().subscribe({
    next: (response:Role[]) => {
      this.roles=response;
      console.log("roles"+this.roles)
    },
    error: (error:HttpErrorResponse) => {
      alert(error.message);

     },
    complete: () => console.info('complete') 
})
}





   
}
