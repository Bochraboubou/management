import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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
  good=0
  alertInscrire=0
  alertUsernameexiste=0
  alertemailutulise=0
  imgURL:any;
userFile:any;
codeOrg!:string
message:string='';
public imagePath:any;
alerteTel=0
altPassLong=0
altPassCourte=0
altPremiernomCourt=0
altPremiernomLong=0
altnomCourte=0
altnomLong=0
altAdresseCourt=0
altAdresseLong=0

  constructor( private serviceProspect:ProspectService,private _service :RegisterService) { }

  ngOnInit(): void {

  }
closeAlerte(){
  this.alerteTel=0
  this.notification=0
  this. erreur=0
  this. good=0
  this.alertInscrire=0
  this. alertUsernameexiste=0
  this. alertemailutulise=0
  this. altPassLong=0
  this.altPassCourte=0
  this. altPremiernomCourt=0
  this.altPremiernomLong=0
 this. altnomCourte=0
this.altnomLong=0
this.altAdresseCourt=0
this.altAdresseLong=0
}

RegisterUser(formRegistration:NgForm){
   

    const formData=new FormData();
    const user=formRegistration.value;
    formData.append('user',JSON.stringify(user));
    formData.append('file',this.userFile)
  console.log(user);

  // controle sur premier nom
  let ch1=user.username
  let size1=ch1.length
  if(size1<4){
   this. altPremiernomCourt=1
  }
   else{
     if(size1>20){
      this. altPremiernomLong=1
     }else {
       
       // controle sur le nom 
      let ch2=user.name
      let size2=ch2.length
  if(size2<4){
  
  this.altnomCourte=1
  } else 
  {
if(size2>20){
    this.altnomLong=1
  }
  else {
    
       // controle sur le numero de tel 
    let chaine=""+user.tel
    let size=chaine.length
    console.log(size)
    if(size!=8){
     this.alerteTel=1
    }else{
      // controle sur le mot de passe 
      let ch3=user.password
      let sizePass=ch3.length
      console.log(sizePass)
      if( sizePass<6){
       // alert("mot de passe tres courte")
       this.altPassCourte=1
      }else{
        if( sizePass>12){
          //alert("mot de passe trop longue")
          this.altPassLong=1
        }
        else{
          let ch4=user.adresse
         let sizeAdresse=ch4.length
         if ( sizeAdresse<5){
          //this.altAdresseCourt=1
          alert("adresse courte")
         }
         else{
          if( sizeAdresse>15){
           // this.altAdresseLong=1
           alert("adresse longue")
          }
        }
        
        }
        
        
      }
    }
  }
}

 }
}

  this._service.findByUserName(user.username).subscribe({
    next: (response:User) => {
     this.user2=response;
      console.log("user"+response);
      
      if(this.user2!=null){
      this.alertUsernameexiste=1
      }else{
        console.log("username n existe pas ");
        this._service.findByEmail(user.email).subscribe({
          next: (response:User) => {
            this.user2=response;
            console.log("user"+response);
            if (this.user2!=null){
             this.alertemailutulise=1
             console.log("email utulisé")
            }
            else {
              console.log("email n existe pas ")
              console.log(user.email)
              console.log(user.codeConfirmation)
              this.serviceProspect.trouverParEmailEtCode(user.email,user.codeConfirmation).subscribe({
                next: (response:Prospect) => {
                  this.prospect=response;
                  console.log("bbbbbbbbbbbbb")
                  console.log("prospect"+response);
                  if (this.prospect==null){
                   this.alertInscrire=1

                  }
                  else{
                    console .log("aaaaaaaaaa")
                    this._service.createUser(formData,this.prospect.id_org,this.prospect.id_role).subscribe({
                      next: (response:User) => {
                        console.log(this.user) 
                        this.user=response;
                       this.notification=1
                      
                       formRegistration.reset();
                      },
                      error: (error:HttpErrorResponse) => {
                        this.erreur=1
                        alert(error.message)
                       },
                      complete: () => console.info('complete') 
                  })
                    
                    /*

                   this._service.RegisterFromRemote(this.user,this.prospect.id_org,this.prospect.id_role).subscribe({
                      next: (response:User) => {
                        this.user=response;
                        this.notification=1;
                    
                      },
                      error: (error:HttpErrorResponse) => {
                        this.erreur=1
                        alert(error.message)
                       },
                      complete: () => console.info('complete') 
                  })*/
                    
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

  
//this.trouverProspect(this.user.email,this.user.codeConfirmation,this.user.username)
   

  }



 
 trouverProspect(emailll:string,coode:string,username:string ){

  this._service.findByUserName(username).subscribe({
    next: (response:User) => {
     this.user2=response;
      console.log("user"+response);
      
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

   
 
  }
//////////////

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
