import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Organisation } from 'src/app/model/Organisation';
import { User } from 'src/app/model/User';
import { LoginService } from 'src/app/service/login.service';
import { OrganisationServiceService } from 'src/app/service/organisation-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  user= new User();
  msg='';
  code!:string;
  organisation =new Organisation();
  constructor(private _route:Router,private service:LoginService,private rooote:ActivatedRoute, private OrganisationService:OrganisationServiceService) { }

  ngOnInit(): void {
    const organisationId= this.rooote.snapshot.params['id'];
//organisation=this.OrganisationService.getOrganisationbyCode(organisationId)
  }
  
  loginUser(){

     this.service.guestLogin(this.user).subscribe(
      data=>{console.log("accept");
this.code=this.user.code_org;
      this._route.navigate(['/cpm/${code}']);
     // this._route.navigate(['/cpm'],{ queryParams:{id:2}});
       },  
    
    error =>{
      this.msg=" erreuur";
      console.log("user not exist",this.user.username,this.user.password);
    }
      );
  } 

}
