import { Component, OnInit } from '@angular/core';
import { Email } from 'src/app/model/Email';
import { EmailService } from 'src/app/service/email.service';

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.css']
})
export class SendMailComponent implements OnInit {

  constructor(private mailService:EmailService ) { }
  email=new Email();
  msg="";
  ngOnInit(): void {
  }
  sendEmail(){
    this.mailService.affiche(this.email).subscribe(
      (data: any)=>{console.log("accept");
    
       },  
    
      ( error: any) =>{
      this.msg=" erreuur";
      console.log("please enter valid email and password ");
    }
      );
  
  }
  onReset(){
    
  }

}
