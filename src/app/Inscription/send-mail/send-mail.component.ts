import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Demande } from 'src/app/model/Demande';
import { Email } from 'src/app/model/Email';
import { DemandeService } from 'src/app/service/demande.service';
import { EmailService } from 'src/app/service/email.service';

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.css']
})
export class SendMailComponent implements OnInit {
  random_string="";


  email=new Email();
  code="";
  demande !:Demande;
 msg=""
  id!:number;

 objet="cpm-Group";
message!:string
  constructor(private mailService:EmailService, private activeRoute:ActivatedRoute,private demandeService:DemandeService ) { }
  


  ngOnInit(): void {
    this.id=this.activeRoute.snapshot.params['id'];
    this.demande=new Demande();
    this.demandeService.getDemandeById(this.id).subscribe(
      data=>{
        this.demande=data;

      }
    )


  }
 
  sendEmail(){
this.message=" Bonjour"+this.demande.nomAdmin+"Bienvenue dans CMP-GROUP +nous sommes ravis de vous avoir à bord et nous aimerions vous remercier au nom de toute notre entreprise de nous avoir choisis votre code de confirmation est :"+this.code+"Prends soin de toi,CPM-GROUP";
  this.email.destinataire=this.demande.emailAdmin;
  console.log(this.email.destinataire);
  this.code=this.randomString(this.demande.nomAdmin);
  console.log(this.code)
   this.email.message=this.message;
   this.email.objet=this.objet;
  // console.log(this.email.code);
 //  console.log(this.email.objet);
   //console.log(this.email.message);
   console.log(this.email);
    this.mailService.affiche(this.email).subscribe(
      (data: any)=>{console.log("accept");
    this.code=this.code+1;
   

       },  
    
      ( error: any) =>{
      this.msg=" erreuur";
      console.log("please cheak your Adresse destinataire");
    }
      );
      
  
  }
  
  /*
  strRandom({
    includeUpperCase: true,
    includeNumbers: true,
    length: 5,
    startsWithLowerCase: true
  });
*/

  onReset(){
    
  }
  
   randomString(ch:String){
    
//ch="azertyuudjdgfbhliokmpynbfdcsxqz1112345678890kdjdxvvdcdcfcdccdcjjzhzhzefffvvcvcv";
for (var i = 0 ;i<10;i++ ){
  this.random_string +=ch.charAt(Math.floor(Math.random()*ch.length));

}console.log(this.random_string);
return this.random_string;

  }

}
