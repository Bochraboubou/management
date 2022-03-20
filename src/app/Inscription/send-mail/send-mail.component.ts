import { HttpErrorResponse } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Demande } from 'src/app/model/Demande';
import { Email } from 'src/app/model/Email';
import { Prospect } from 'src/app/model/Prospect';
import { DemandeService } from 'src/app/service/demande.service';
import { EmailService } from 'src/app/service/email.service';
import { MailSkipTestsService } from 'src/app/service/mail--skip-tests.service';
import { MainSkipTestsService } from 'src/app/service/main--skip-tests.service';
import { ProspectService } from 'src/app/service/prospect.service';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.css']
})
export class SendMailComponent implements OnInit {
  random_string="";

emails !:Email[];

  email=new Email();
  code="";
  demande !:Demande;
 msg=""
  id!:number;
  
  prospect=new Prospect();


 objet="cpm-Group";
message!:string
  constructor(private prospectService:ProspectService,private registerService:RegisterService,private sendsend:MainSkipTestsService   ,  private mailService:EmailService, private activeRoute:ActivatedRoute,private demandeService:DemandeService ) { }
  


  ngOnInit(): void {
    this.id=this.activeRoute.snapshot.params['id'];
    this.demande=new Demande();
    this.demandeService.getDemandeById(this.id).subscribe(
      data=>{
        this.demande=data;

      }
    )


  }
  public envoyerEmail(){
    console.log(this.email);
    this.email.destinataire="bochra.nahalii@gmail.com";
    this.email.message="nour"
    this.email.objet="objet";
    this.email.message=" Bonjour"+this.demande.nomAdmin+"Bienvenue dans CMP-GROUP +nous sommes ravis de vous avoir à bord et nous aimerions vous remercier au nom de toute notre entreprise de nous avoir choisis votre code de confirmation est :"+this.code+"Prends soin de toi,CPM-GROUP";
    this.email.destinataire=this.demande.emailAdmin
    this.email.objet="CPM-Group"
    console.log(this.email)
    this.code=this.randomString(5)
    
    this.registerService.envoyerUnEmail(this.email).subscribe(
      
        (data:Email)=>{console.log(data);
          alert("envoyer......")

          this.prospect.email=this.email.destinataire;
          this.prospect.code=this.code;
          this.saveNewUser(this.prospect);
      
      },
      ( error: any) =>{
        console.log(error)
      alert(" adresse email invalide ou un probleme du serveur !")}
    )

  }
 //ajouter un utulistateur pour la prés inscription
saveNewUser(prospect:Prospect){
  
this.prospectService.addProspect(prospect).subscribe(
  
  (data:Prospect)=>{console.log(data);
    alert("bien enregistrer")

  

   
},
( error: any) =>{
  console.log(error)
alert(" erreur !")}
)



}

  
  
   randomString(string_length:number){
    var randomm=''
    var ch=this.demande.emailAdmin;
         for (var i = 0 ;i<string_length;i++ ){
          randomm +=ch.charAt(Math.floor(Math.random()*ch.length));

           }
        console.log(this.random_string);
         return randomm;

  }

  









  


 




}

 
