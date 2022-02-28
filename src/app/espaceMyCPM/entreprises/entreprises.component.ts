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
  alertEntrepExsist:boolean=false;
  alertSuccess:boolean=false;

  
  

  constructor( private organService:OrganisationServiceService,private entrepriseService:EntrepriseServiceService) { }

  ngOnInit(): void {
    this.getOrgans();
    this.getEntreprises(5);
  }

  //récuperer la liste des entreprises disponibles
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

//récuperer l'entreprise
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
        for (let i = 0; i < this.entreprises.length; i++) {
          if(this.entreprises[i].nom===this.organisation.nom){
            this.alertEntrepExsist=true;
            break;

          }
        }
          if(this.alertEntrepExsist==false){
            this.entrepriseService.addEntreprise(5,addEntrepriseForm.value).subscribe(
              (Response:Entreprise)=>{
                console.log(Response);
                this.entreprises.push(Response);
                this.alertSuccess=true;
                addEntrepriseForm.reset();
              },
              (error:HttpErrorResponse)=>{
                error.message;
                console.log("entreprise not added but dont worry bochra you wil did it");
               
                
              }
            );
          }

          
          
        }
         

         //récuperer la liste des entreprises deja associées

 
        public getEntreprises(organId:number):void
        {
          this.entrepriseService.getEntreprises(organId).subscribe(
            (response:Entreprise[])=>{
              this.entreprises=response;
              
            },
            (error:HttpErrorResponse)=>{
              alert(error.message);
             }
          );
      
            }
          
  
    

}
