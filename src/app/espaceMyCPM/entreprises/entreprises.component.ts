import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Entreprise } from 'src/app/model/Entreprise';
import { Organisation } from 'src/app/model/Organisation';
import { EntrepriseServiceService } from 'src/app/service/entreprise-service.service';
import { OrganisationServiceService } from 'src/app/service/organisation-service.service';

@Component({
  selector: 'app-entreprises',
  templateUrl: './entreprises.component.html',
  styleUrls: ['./entreprises.component.css']
})
export class EntreprisesComponent implements OnInit {
  organs!: Organisation[];
  organisation!: Organisation;
  nom!: string;
  id!: number;
  entreprises!: Entreprise[];
  
  

  constructor( private organService:OrganisationServiceService) { }

  ngOnInit(): void {
    this.getOrgans();
  }

  //récuperer la liste des entreprises
  public getOrgans():void
  {
    this.organService.getOrganisations().subscribe(
      (response:Organisation[])=>{
        this.organs=response;
        
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
       }
    );
      }
      public affich():void{
        console.log(this.id);
      }

}
