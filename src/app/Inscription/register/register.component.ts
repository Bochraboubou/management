import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/model/Role';
import { User } from 'src/app/model/User';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user= new User();
  msg='';
  roles!:Role[];

  constructor(private _service :RegisterService) { }

  ngOnInit(): void {
    console.log("les roles sont::")
    this.onGetRoles();
    
  }
  RegistryUser(){
   this._service.RegisterFromRemote(this.user).subscribe
    (data=>{console.log("accept");
   // this.RegistryUser.reset();
    
       },
    
    error =>{
      this.msg=error.error;
     
    alert("user is already exist  ");
    }
      );


  }
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
