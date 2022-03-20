import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Demande } from 'src/app/model/Demande';
import { Email } from 'src/app/model/Email';
import { DemandeService } from 'src/app/service/demande.service';
import { EmailService } from 'src/app/service/email.service';

@Component({
  selector: 'app-worning-email',
  templateUrl: './worning-email.component.html',
  styleUrls: ['./worning-email.component.css']
})
export class WorningEmailComponent implements OnInit {
demande!:Demande;
id!:number;
email=new Email();

  constructor(private activeRoute:ActivatedRoute, private demandeService:DemandeService, private mailService:EmailService) { }

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
  const message=" Bonjour"+this.demande.nomAdmin+"Bienvenue dans CMP-GROUP +nous sommes ravis de vous avoir à bord et nous aimerions vous remercier au nom de toute notre entreprise de nous avoir choisis vous monquez les informations suivant :                 pour votre inscription .Prends soin de toi,CPM-GROUP";
  this.email.destinataire=this.demande.emailAdmin;
  this.email.message=message;
  this.email.objet="CPM-GRPOUP";
    this.mailService.affiche(this.email).subscribe(
      (data: any)=>{
        console.log("accepteeeee");
        console.log(data);
   
       },  
    
      ( error: any) =>{
        alert(error.message)
        console.log(error)

    
      console.log("please cheak your Adresse destinataire");
    }
      );
      
    
  }
}
