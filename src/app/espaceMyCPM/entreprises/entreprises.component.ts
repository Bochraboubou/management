import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  
  

  
  

  constructor( private organService:OrganisationServiceService,private entrepriseService:EntrepriseServiceService) { }

  ngOnInit(): void {
    this.getOrgans();
    
  }

  //récuperer la liste des entreprises disponibles
  public getOrgans():void
  {
    this.organService.getOrganisations().subscribe({
      next: (response:Organisation[]) => {
        this.organs=response;
        
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);
       },
      complete: () => console.info('complete') 
  })
      }
     


         

        
          
  
    

}
