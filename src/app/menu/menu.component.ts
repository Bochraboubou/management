import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Menu } from '../model/Menu';
import { Organisation } from '../model/Organisation';
import { User } from '../model/User';
import { OrganisationServiceService } from '../service/organisation-service.service';
import { PassageService } from '../service/passage.service';
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


  constructor( private serviceUser:UserService , private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.user=new User();
    this.serviceUser.getUserById(this.id).subscribe(
      data=>{
        this.user=data;
     

    }
    )

     }

}
