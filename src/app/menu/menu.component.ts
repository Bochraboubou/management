import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Organisation } from '../model/Organisation';
import { User } from '../model/User';
import { LoginService } from '../service/login.service';
import { RegisterService } from '../service/register.service';

import { UserService } from '../service/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

//org=new Organisation();
//name:string='organisation';
id!:number;
user!:User;
username!:string

  constructor(public Service:UserService,public loginService:LoginService ,private serviceUser:UserService ,private register:RegisterService, private route:ActivatedRoute) { }

  ngOnInit(): void {

this.username=this.loginService.loggedUser
this.register.findByUserName(this.username).subscribe(
  data=>{
    this.user=data;
  }
)


   /* this.id=this.route.snapshot.params['id'];
    this.user=new User();
    this.serviceUser.getUserById(this.id).subscribe(
      data=>{
        this.user=data;
     

    }
    )
*/
     }
     on(){
       console.log(this.loginService.isAdminCPM())
     }

}
