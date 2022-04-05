import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-send-email-user',
  templateUrl: './send-email-user.component.html',
  styleUrls: ['./send-email-user.component.css']
})
export class SendEmailUserComponent implements OnInit {
  id!:number;
user=new User()
  constructor( private router:Router, private route:ActivatedRoute,private Service:UserService) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.user=new User();

    this.Service.getUserById(this.id).subscribe(
      data=>{
        this.user=data;
        console.log(this.user.id)
        console.log(this.user.email)
      })
  }
  envoyerEmail(){
   
  }
}
