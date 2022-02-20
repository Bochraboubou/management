import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { EntreprisePopupComponent } from '../entreprise-popup/entreprise-popup.component';
import { Entreprise } from '../model/Entreprise';
import { Organisation } from '../model/Organisation';
import { EntrepriseServiceService } from '../service/entreprise-service.service';
import { OrganisationServiceService } from '../service/organisation-service.service';

@Component({
  selector: 'app-ajouter-organisation',
  templateUrl: './ajouter-organisation.component.html',
  styleUrls: ['./ajouter-organisation.component.css']
})
export class AjouterOrganisationComponent implements OnInit {
  entreprises:Entreprise[]=[];
  idOrgan!: number;
  entreprise!: Entreprise;

  constructor(private dialogRef:MatDialog,private organisationService:OrganisationServiceService,private EntrepriseService:EntrepriseServiceService) { }

  ngOnInit(): void {
  }
  openDialog()
    {
      const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.dialogRef.open(EntreprisePopupComponent, dialogConfig);
  }
    
  public onOpenAddEntrepModal():void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    button.setAttribute('data-target','#addEntrapModal');
    container?.appendChild(button);
    button.click();
    

  }

  //ajouter une organisation
  public onAddOrganisation(addOrganisationForm:NgForm):void{
    this.organisationService.addOrganisation(addOrganisationForm.value).subscribe(
       (Response:Organisation)=>{
        console.log(Response);
        this.idOrgan=Response.id;
        for (let i = 0; i < this.entreprises.length; i++)
        {
          this.EntrepriseService.addEntreprise(this.idOrgan,this.entreprises[i]).subscribe(
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
        
       // this.getOrganisations();
        addOrganisationForm.reset();
      },
      (error:HttpErrorResponse)=>{
        error.message;
        addOrganisationForm.reset();
      }
    );
  }
  

  //ajouter une organisation
  public onAddEntreprise(addEntrepriseForm:NgForm):void{
    document.getElementById('add-entrep-form')?.click();
    this.entreprise=addEntrepriseForm.value;
    this.entreprises.push(addEntrepriseForm.value);
    console.log(this.entreprise);
    for (let i = 0; i < this.entreprises.length; i++){
      console.log("la liste d'entreprise est "+this.entreprises[i].nom)
    }
   
    
   
   
   
    /* this.EntrepriseService.addEntreprise(addEntrepriseForm.value).subscribe(
      (Response:Entreprise)=>{
        console.log(Response);
       // this.getOrganisations();
        addEntrepriseForm.reset();
      },
      (error:HttpErrorResponse)=>{error.message;
        addEntrepriseForm.reset();
      }
    );*/
  }
  
  

}
