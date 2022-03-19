import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Demande } from 'src/app/model/Demande';
import { DemandeService } from 'src/app/service/demande.service';

@Component({
  selector: 'app-worning-email',
  templateUrl: './worning-email.component.html',
  styleUrls: ['./worning-email.component.css']
})
export class WorningEmailComponent implements OnInit {
demande!:Demande;
id!:number;

  constructor(private activeRoute:ActivatedRoute, private demandeService:DemandeService) { }

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
    
  }
}
