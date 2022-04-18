import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Demande } from 'src/app/model/Demande';
import { Email } from 'src/app/model/Email';
import { DemandeService } from 'src/app/service/demande.service';
import { EmailService } from 'src/app/service/email.service';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-worning-email',
  templateUrl: './worning-email.component.html',
  styleUrls: ['./worning-email.component.css']
})
export class WorningEmailComponent implements OnInit {
demande!:Demande;
id!:number;
email=new Email();
alertEmail=0
good=0

  constructor(private registerService:RegisterService,private activeRoute:ActivatedRoute, private demandeService:DemandeService, private mailService:EmailService) { }

  ngOnInit(): void {
    this.id=this.activeRoute.snapshot.params['id'];
    this.demande=new Demande();
    this.demandeService.getDemandeById(this.id).subscribe(
      data=>{
        this.demande=data;

      }
    )
  }

/*

  this.email.objet="CPM-GRPOUP";
*/
  sendEmail(){


    this.email.destinataire=this.demande.emailAdmin;
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
