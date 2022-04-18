import { HttpErrorResponse } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Demande } from 'src/app/model/Demande';
import { Email } from 'src/app/model/Email';
import { Organisation } from 'src/app/model/Organisation';
import { Prospect } from 'src/app/model/Prospect';
import { DemandeService } from 'src/app/service/demande.service';
import { EmailService } from 'src/app/service/email.service';
import { MailSkipTestsService } from 'src/app/service/mail--skip-tests.service';
import { MainSkipTestsService } from 'src/app/service/main--skip-tests.service';
import { OrganisationServiceService } from 'src/app/service/organisation-service.service';
import { ProspectService } from 'src/app/service/prospect.service';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.css']
})
export class SendMailComponent implements OnInit {
  random_string="";
  demande2!:Demande
emails !:Email[];
code2:string="";

  email=new Email();
  
  demande !:Demande;
 msg=""
  id!:number;
  code!:string
  userFile:any;
  prospect=new Prospect();
organisation=new Organisation();
lien="http://localhost:4200/register"
 objet="cpm-Group";
message!:string
alertEnvoyer=0
alertnewProspect=0
alertOrganisation=0
notification=0
  constructor(private orgService:OrganisationServiceService,private prospectService:ProspectService,private registerService:RegisterService,private sendsend:MainSkipTestsService   ,  private mailService:EmailService, private activeRoute:ActivatedRoute,private demandeService:DemandeService ) { }
  


  ngOnInit(): void {

    
    this.id=this.activeRoute.snapshot.params['id'];
    this.demande=new Demande();
    this.demandeService.getDemandeById(this.id).subscribe(
      data=>{
        this.demande=data;

      }
    )
    this.randomString(8)
     console.log(this.randomString(8)); 
    
this.showinformation();
  }
 

ok(){
  console.log(this.demande)
}



  public envoyerEmail(){
   this.code=this.randomString(8)
    this.email.message=" Bonjour"+this.demande.nomAdmin+"Bienvenue dans CMP-GROUP +nous sommes ravis de vous avoir à bord.code de confirmation est :"+this.code+"--lien"+this.lien+" pour s'inscrire .Prends soin de toi,CPM-GROUP";
    this.email.destinataire=this.demande.emailAdmin
    this.email.objet="CPM-Group"
    console.log(this.email)
    console.log(this.email.message)
   

  this.registerService.envoyerUnEmail(this.email).subscribe(
      
        (data:Email)=>{console.log(data);
         // alert("envoyer......")
          this.alertEnvoyer=1
        // ajouter organisation
     this.organisation.nom=this.demande.nom;
     this.organisation.code=this.demande.code;
     this.organisation.secteur_d_activite=this.demande.secteur_d_activite;
     this.organisation.email=this.demande.email;
     this.organisation.pays=this.demande.pays;
     this.organisation.region=this.demande.region;
     this.organisation.adresse=this.demande.adresse;
     this.organisation.tel=this.demande.telOrg;
     this.organisation.type=this.demande.type;
     this.organisation.nomDG=this.demande.nomDG;
     this.organisation.telDG=this.demande.telDG;
     this.organisation.emailDG=this.demande.emailDG;
     this.organisation.nomAdmin=this.demande.nomAdmin;
     this.organisation.telAdmin=this.demande.telAdmin;
     this.organisation.emailAdmin=this.demande.emailAdmin
     this.organisation.fileName=this.demande.fileName
     this.organisation.document=this.demande.documentpath;
      console.log(this.organisation)
   //

   console.log(this.organisation)
   this.saveNewOrganisation(this.organisation);
    //this.OncreateOrganisation(this.organisation)
      
      
     
      },
      ( error: any) =>{
        console.log(error)
      alert(" adresse email invalide ou un probleme du serveur !")}
    )

  }



  OncreateOrganisation(organisation:Organisation){
    const formData=new FormData();
      //const organisation=addForm.value;
      formData.append('organisation',JSON.stringify(organisation));
      formData.append('file',this.userFile)
      this.orgService.createOrganisation(formData).subscribe(
        (response: Organisation) => {
          console.log(response);
         this.notification=1
         this.updateDemande(this.demande.id,this.demande);
        
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
          console.log(error);
          
        }
      );
  }












 //ajouter un utulistateur pour la prés inscription
saveNewUser(prospect:Prospect){
  
this.prospectService.addProspect(prospect).subscribe(
  
  (data:Prospect)=>{console.log(data);

  this.  alertnewProspect=1
    alert(" new user bien enregistrer")
 
},
 ( error: any) =>{
  console.log(error)
 alert(" erreur !")}
  )

 }
//-------------------
saveNewOrganisation(organisation:Organisation){
  this.orgService.addOrganisation(organisation).subscribe(
    (data:Organisation)=>{
      this.organisation=data
      console.log(data);
      this.alertOrganisation=1
      console.log("organisation enregistrer")

      console.log(" l id de l'organisation est"+this.organisation.id)
       //ajouter email,code ,idORG,idRole a la table prospect
       this.prospect.id_org=this.organisation.id;
       this.prospect.email=this.email.destinataire;
       this.prospect.code=this.code;
       this.prospect.id_role=2
        this.saveNewUser(this.prospect);
      

    },

      ( ( error: any) =>{
        console.log(error)
      alert(" organisation n'est pas enregistrer !")})
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

  //update demande
  updateDemande(id:number,demande:Demande){
    this.demande2=demande;
    console.log(this.demande2);
    this.demande2.demandeStatus=true
   
this.demandeService.updateDemande(id,this.demande2).subscribe({
next: (response:any) => {
 console.log("bien modifier");
},
error: (error:HttpErrorResponse) => {
  alert(error.message);
 },
complete: () => console.info('complete') 
})
  }


  showinformation(){
 this.code=this.randomString(6);
 console.log(this.code);
  }




 


  closeAlerte(){
   this.alertEnvoyer=0
   this.alertnewProspect=0
   this.alertOrganisation=0
   this.notification=0
  }
/////////the end //////////




}

 
