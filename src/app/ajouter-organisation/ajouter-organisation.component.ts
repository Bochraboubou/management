import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { EntreprisePopupComponent } from '../entreprise-popup/entreprise-popup.component';
import { Organisation } from '../model/Organisation';
import { Secteur } from '../model/Secteur';
import { EntrepriseServiceService } from '../service/entreprise-service.service';
import { OrganisationServiceService } from '../service/organisation-service.service';
import { SecteurService } from '../service/secteur.service';

@Component({
  selector: 'app-ajouter-organisation',
  templateUrl: './ajouter-organisation.component.html',
  styleUrls: ['./ajouter-organisation.component.css']
})
export class AjouterOrganisationComponent implements OnInit {
 
  idOrgan!: number;
  secteurs!: Secteur[];
  

  constructor(private dialogRef:MatDialog,private organisationService:OrganisationServiceService,private EntrepriseService:EntrepriseServiceService,private secteurService:SecteurService) { }

  ngOnInit(): void {
    this.getSecteurs();
    this.organisationService.getOneOrganisation(5).subscribe(
      (response:Organisation)=>{
        console.log(response);
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
       }
    );
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
 

  //ajouter une organisation
  public onAddOrganisation(addOrganisationForm:NgForm):void{
    this.organisationService.addOrganisation(addOrganisationForm.value).subscribe(
       (Response:Organisation)=>{
        console.log(Response);
      
       // this.getOrganisations();
        addOrganisationForm.reset();
      },
      (error:HttpErrorResponse)=>{
        error.message;
        addOrganisationForm.reset();
      }
    );
  }
  //récuperer la liste des secteurs d'activités
  public getSecteurs():void
  {
    this.secteurService.getSecteurs().subscribe(
      (response:Secteur[])=>{
        this.secteurs=response;
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
       }
    );
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
