import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Email } from 'src/app/model/Email';
import { User } from 'src/app/model/User';
import { RegisterService } from 'src/app/service/register.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-send-email-user',
  templateUrl: './send-email-user.component.html',
  styleUrls: ['./send-email-user.component.css']
})
export class SendEmailUserComponent implements OnInit {
  id!:number;
user=new User()
email=new Email()
good=0
alertEmail=0
  constructor(private registerService:RegisterService, private router:Router, private route:ActivatedRoute,private Service:UserService) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.user=new User();
   /*   <div class="alert alert-success" *ngIf="good==1">
                      <strong>email envoyer a {{email.destinataire}..</strong>
                  </div>
   */

    this.Service.getUserById(this.id).subscribe(
      data=>{
        this.user=data;
        console.log(this.user.id)
        console.log(this.user.email)
      })
  }
 
   
  public envoyerEmail(){
    
     
     this.email.destinataire=this.user.email
     this.email.objet="CPM-Group"
     console.log(this.email.message)
     console.log(this.email)
    
 
  this.registerService.envoyerUnEmail(this.email).subscribe({
        next: (response:Email) => {
            this.email=response;
            this.good=1
          },
          error: (error:HttpErrorResponse) => {
           this.alertEmail=1

          
      
           },
          complete: () => console.info('complete') 
      })
          
  }
}
