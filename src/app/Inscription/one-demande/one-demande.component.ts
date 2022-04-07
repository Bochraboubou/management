import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Demande } from 'src/app/model/Demande';
import { DemandeService } from 'src/app/service/demande.service';

@Component({
  selector: 'app-one-demande',
  templateUrl: './one-demande.component.html',
  styleUrls: ['./one-demande.component.css']
})
export class OneDemandeComponent implements OnInit {
id!:number;
demande !:Demande;
demande2!:Demande;

  constructor(private route:ActivatedRoute,private router:Router, private demandeService:DemandeService) { }

  ngOnInit(): void {
 
      this.id=this.route.snapshot.params['id'];
       this.demande=new Demande();
       this.demandeService.getDemandeById(this.id).subscribe(
         data=>{
           this.demande=data;
           console.log(this.demande.demandeStatus)
          
         }
       )
      

  }

  onAfficheDetailConfirmer(idDemande:number){
    this.demande.demandeStatus=true;
    console.log(this.demande.demandeStatus)
 this.router.navigate(['send',idDemande])
 
  }
  onAfficheDetailWorning(idDemande:number){
    console.log(this.demande.demandeStatus)
    this.router.navigate(['warningMail',idDemande])
    }
  

    updateDemande(id:number, demande:Demande){
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

}
