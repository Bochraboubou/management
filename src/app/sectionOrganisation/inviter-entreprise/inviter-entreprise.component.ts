import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Email } from 'src/app/model/Email';
import { MailSkipTestsService } from 'src/app/service/mail--skip-tests.service';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-inviter-entreprise',
  templateUrl: './inviter-entreprise.component.html',
  styleUrls: ['./inviter-entreprise.component.css']
})
export class InviterEntrepriseComponent implements OnInit {
  emailDestinataire!:string
  alertEnvoyer=0;
  erreur=0
  lien="http://localhost:4200/passerdemande"
  email=new Email()
  constructor(private registerService:RegisterService) { }

  ngOnInit(): void {
  }
  
  public envoyerEmail(){
 
     this.email.message=" Bonjour Bienvenue dans CMP-GROUP +nous espérons que vous serez parmi notre équipe. pour s'inscrire taper le lien ---:"+this.lien+" -- .Prends soin de toi,CPM-GROUP";
     this.email.destinataire=this.emailDestinataire
     this.email.objet="CPM-Group"
     console.log(this.email)
     console.log(this.email.message)
    
 
   this.registerService.envoyerUnEmail(this.email).subscribe({
    next: (response:Email) => {
      this.email=response;
      this.alertEnvoyer=1
  
    },
    error: (error:HttpErrorResponse) => {
      this.erreur=1
      alert(error.message)
     },
    complete: () => console.info('complete') 
   })
  }
  closeAlerte(){
    this.alertEnvoyer=0
    this.erreur=0
  }
}
