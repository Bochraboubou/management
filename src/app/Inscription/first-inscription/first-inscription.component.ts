import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Organisation } from 'src/app/model/Organisation';
import { Prospect } from 'src/app/model/Prospect';
import { User } from 'src/app/model/User';
import { OrganisationServiceService } from 'src/app/service/organisation-service.service';
import { ProspectService } from 'src/app/service/prospect.service';
import { RegisterService } from 'src/app/service/register.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-first-inscription',
  templateUrl: './first-inscription.component.html',
  styleUrls: ['./first-inscription.component.css']
})
export class FirstInscriptionComponent implements OnInit {
  adminmycpm=0
  codeorgani=0
  emailutulise=0
  erreur=0
  notification=0
  user= new User();
  prospect!:Prospect
  msg='';
  user2!:User
  id_org!:number
  code!:string
  id_role!:number;
  good=0
  imgURL:any;
userFile:any;
codeOrg!:string
 message:string='';
 public imagePath:any;
 organisation!:Organisation
 alerttel=0
 notificationAdmin=0
 ORGnexistepas=0
  constructor(private organisationser:OrganisationServiceService,private _service:RegisterService,private serviceProspect:ProspectService) { }

  ngOnInit(): void {

    
  }
  /*RegistryUser(){
    this.verifier(this.user.email,this.user.username)
   
  }
*/

 verifier(emailll:string,username:string ){
   
  console.log(this.id_org)
  this.id_role=7;
    this._service.findByUserName(username).subscribe({
      next: (response:User) => {
       this.user2=response;
        console.log("user"+response);
        //console.log("user"+this.user2.id);
        if(this.user2!=null){
          //alert(" username deja exisete");
          this.good=1
        }else{
          console.log("username n existe pas ");
          this._service.findByEmail(emailll).subscribe({
            next: (response:User) => {
              this.user2=response;
              console.log("user"+response);
              if (this.user2!=null){
               
               this.emailutulise=1;
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
                          console.log(this.user) 
                          this.user=response;
                         this.notification=1
                         /* if(this.user!=null){
                            alert( "inscription avec suucces ")
                          console.log("user"+response+"bien ajouter ");
                        }else {
                          console.log("user"+response+"n'est pas ajouter ajouter ");
                        }*/
                        },
                        error: (error:HttpErrorResponse) => {
                         // alert(error.message);
                         this.codeorgani=1
                         },
                        complete: () => console.info('complete') 
                    })
                  }
                    else{
                      this.adminmycpm=1
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

public onAddUser(addForm: NgForm): void {

  this.id_role=7;
  const formData=new FormData();
  const user=addForm.value;
  formData.append('user',JSON.stringify(user));
  formData.append('file',this.userFile)
console.log(user);
console.log(user.code)

if(user.code=="CPMGROUP"){
  this.organisationser.getOrganisationbyCode(user.code).subscribe({
    next: (response:Organisation) => {
      this.organisation=response;
      console.log(this.organisation.id)
      this._service.createUser(formData,this.organisation.id,3).subscribe({
        next: (response:User) => {
          console.log(this.user) 
          this.user=response;
         
         this.notificationAdmin=1
        console.log("vous etes l'admin du cpm")
         addForm.reset();
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

}else{
this.organisationser.getOrganisationbyCode(user.code).subscribe({
  next: (response:Organisation) => {
    this.organisation=response;
    console.log(this.organisation.id)//code bien verifier

    this._service.findByUserName(user.username).subscribe({
      next: (response:User) => {
       this.user2=response;
        console.log("user"+response);
        //console.log("user"+this.user2.id);
        if(this.user2!=null){
          //alert(" username deja exisete");
          this.good=1
        }else{
          console.log("username n existe pas ");
          this._service.findByEmail(user.email).subscribe({
            next: (response:User) => {
              this.user2=response;
              console.log("user"+response);
              if (this.user2!=null){
               this.emailutulise=1;
              }else{
                console.log("email n existe pas ")
                this.serviceProspect.trouverParEmail(user.email).subscribe({
                  next: (response:Prospect) => {
                    this.prospect=response;
                    console.log("prospect"+response);

                    if (this.prospect==null){
                      console.log(user.tel)
                      console.log(user.tel.length)
                      
                     this._service.createUser(formData,this.organisation.id,this.id_role).subscribe({
                        next: (response:User) => {
                          console.log(this.user) 
                          this.user=response;
                         this.notification=1
                        
                         addForm.reset();
                         
                        },
                        error: (error:HttpErrorResponse) => {
                         // alert(error.message);
                         this.ORGnexistepas=1
                         },
                        complete: () => console.info('complete') 
                    })
                  
                        

                    }


                  },
                  error: (error:HttpErrorResponse) => {
                    this.codeorgani=1
                   },
                  complete: () => console.info('complete') 
                })
    


              }
            
            },
              error: (error:HttpErrorResponse) => {
                this.codeorgani=1
               },
              complete: () => console.info('complete') 
            })


        }
    
  },
  error: (error:HttpErrorResponse) => {
    this.codeorgani=1
   },
  complete: () => console.info('complete') 
})

  },
  error: (error:HttpErrorResponse) => {
    this.codeorgani=1
   },
  complete: () => console.info('complete') 
})
}
  
/*this.codeOrg=addForm.value.codeOrg;
   this._service.createUser(formData,6,7).subscribe(
     (response: User) => {
       console.log(response);
      this.notification=1
      addForm.reset();
     },
     (error: HttpErrorResponse) => {
       alert(error.message);
       console.log("erreur");
       //addForm.reset();
     }
   );*/
   
 
}



onSelectFile(event:any){
if (event.target.files.length>0){
  const file=event.target.files[0];
  this.userFile=file;
  //this.f['profile'].setValue(file);
  var mimeType =event.target.files[0].type;
  if(mimeType.match(/image\/*/)==null){
this.message="Only images are suported.";
return;
  }
  var reader= new FileReader();
  this.imagePath=file;
  reader.readAsDataURL(file);
  reader.onload=(_event)=>{
    this.imgURL=reader.result;
  }
}
 }



}
