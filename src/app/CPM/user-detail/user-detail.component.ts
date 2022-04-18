import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Organisation } from 'src/app/model/Organisation';
import { Role } from 'src/app/model/Role';
import { User } from 'src/app/model/User';
import { OrganisationServiceService } from 'src/app/service/organisation-service.service';
import { RegisterService } from 'src/app/service/register.service';

import { RoleService } from 'src/app/service/role.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  roleAjouter=0
  id!:number;
user=new User()
notification=0
user2!:User;
imgURL:any;
userFile:any;
 message:string='';
 public imagePath:any;
 attention=0
 roles!:Role[];
 organisation!:Organisation
  code!:string;
AllRoles!:Role[]
noroleAlerte=0
nomRole!:string

  constructor(private router:Router,private organisationservice:OrganisationServiceService, private roleService:RoleService,private registerService:RegisterService,private route:ActivatedRoute, public Service:UserService) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.user=new User();

    this.Service.getUserById(this.id).subscribe(
      data=>{
        this.user=data;
        this.roleService.findRoleOfUser(this.id).subscribe({
          next: (response:Role[]) => {
            this.roles=response;
            console.log("roles"+this.roles)
            this.onGetCodeOrganisation()
          },
          error: (error:HttpErrorResponse) => {
            alert(error.message);
      
           },
          complete: () => console.info('complete') 
      })
      
       
      }
    )
    this.onGetAllRoles();
    
   


  }
  

  public updateUser(infoForm: NgForm): void {


    const formData=new FormData();
    const user=infoForm.value;
    formData.append('user',JSON.stringify(user));
    formData.append('file',this.userFile)
    
 
     this.registerService.UpdateUser(formData,user.id).subscribe(
       (response: User) => {
         console.log(response);
         console.log("modifieeeeee");
        this.notification=1
       
       },
       (error: HttpErrorResponse) => {
         //alert(error.message);
         console.log("erreur");
         this.attention=1
         //addForm.reset();
       }
     );
     
   
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

 

   public onGetRoles(id :number):void{
    this.roleService.findRoleOfUser(id).subscribe({
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

  
public onGetCodeOrganisation(){
  this.organisationservice.getOrganisationbyUser(this.user.id).subscribe({
    next: (response:Organisation) => {
      this.organisation=response;
      console .log("aaaaaaaaaaaaaa")
      this.user.code=this.organisation.code;
      console.log("le code de l'organisation est"+this.code)
    },
    error: (error:HttpErrorResponse) => {
      alert(error.message);
      alert("ttttttttt")

     },
    complete: () => console.info('complete') 
}) 
}   

public onOpenAddRoleeModal():void{
 const container=document.getElementById('mainContainer');
      const button=document.createElement('button');
      button.type='button';
      button.style.display='none';
      button.setAttribute('data-toggle','modal');
      button.setAttribute('data-target','#addRole');
      container?.appendChild(button);
      button.click();

     
      
   
} // cette partie pour l'addition du role pour un utulisateur
ajouter(){

}
onGetAllRoles(){
  this.roleService.findAll().subscribe({
    next: (response:Role[]) => {
      this.AllRoles=response;
     
},
error: (error:HttpErrorResponse) => {
  alert(error.message);
  this.noroleAlerte=1
 },
complete: () => console.info('complete') 

})
}

sendEmail(id:number){
  this.router.navigate(['sendToUser',id])
}
}
