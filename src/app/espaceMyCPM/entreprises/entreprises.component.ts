import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  idOrgan!: number;
  
  

  constructor( private organService:OrganisationServiceService,private entrepriseService:EntrepriseServiceService) { }

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


      public getOrganisation(organId:number){
        this.organService.getOneOrganisation(organId).subscribe(
          (response:Organisation)=>{
            this.organisation=response;
            console.log(response);
            console.log(this.organisation.email);
            
          },
          (error:HttpErrorResponse)=>{
            alert(error.message);
           }
        );

      }
//associer l'entreprise
      public onAddEntreprise(addEntrepriseForm:NgForm):void{
          this.entrepriseService.addEntreprise(5,addEntrepriseForm.value).subscribe(
            (Response:Entreprise)=>{
              console.log(Response);
             // this.getOrganisations();
            },
            (error:HttpErrorResponse)=>{
              error.message;
              console.log("entreprise not added but dont worry bochra you wil did it")
              
            }
          );
        }
    

}
