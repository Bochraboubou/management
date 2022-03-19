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

  constructor(private route:ActivatedRoute,private router:Router, private demandeService:DemandeService) { }

  ngOnInit(): void {
      this.id=this.route.snapshot.params['id'];
       this.demande=new Demande();
       this.demandeService.getDemandeById(this.id).subscribe(
         data=>{
           this.demande=data;

         }
       )


  }

  onAfficheDetailConfirmer(idDemande:number){
  this.router.navigate(['send',idDemande])
  }
  onAfficheDetailWorning(idDemande:number){
    this.router.navigate(['warningMail',idDemande])
    }
  

  

}
