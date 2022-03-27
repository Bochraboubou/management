import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Prospect } from 'src/app/model/Prospect';
import { User } from 'src/app/model/User';
import { ProspectService } from 'src/app/service/prospect.service';
import { RegisterService } from 'src/app/service/register.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-first-inscription',
  templateUrl: './first-inscription.component.html',
  styleUrls: ['./first-inscription.component.css']
})
export class FirstInscriptionComponent implements OnInit {
  user= new User();
  prospect!:Prospect
  msg='';
  user2!:User
  id_org!:number
  id_role!:number;
  constructor(private _service:RegisterService,private serviceProspect:ProspectService) { }

  ngOnInit(): void {
  }
  RegistryUser(){
    this.verifier(this.user.email,this.user.username)
   
  }


 verifier(emailll:string,username:string ){
  console.log(this.id_org)
  this.id_role=7;
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
                this.serviceProspect.trouverParEmail(emailll).subscribe({
                  next: (response:Prospect) => {
                    this.prospect=response;
                    console.log("prospect"+response);
                    if (this.prospect==null){
                      console.log("vous n avez pas faire une demande")
                      this._service.RegisterSimpleUser(this.user,this.id_org,this.id_role).subscribe({
                        next: (response:User) => {
                          this.user=response;
                          alert( "inscription avec suucces ")
                         /* if(this.user!=null){
                            alert( "inscription avec suucces ")
                          console.log("user"+response+"bien ajouter ");
                        }else {
                          console.log("user"+response+"n'est pas ajouter ajouter ");
                        }*/
                        },
                        error: (error:HttpErrorResponse) => {
                          alert(error.message);
                         },
                        complete: () => console.info('complete') 
                    })
                    }
                    else{
                      console.log("vos etes l'admin d'une organisation qui a fait une  demande l!!!")
                      
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
}
}
