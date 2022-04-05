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
  totalLength:any;
  page:number = 1;
  terme:any;
  
  

  
  

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
        this.totalLength=response.length;
        
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);
       },
      complete: () => console.info('complete') 
  })
      }


      //chercher des entreprises
      public searchEntreprise():void{
        
            if(this.terme="")
            {
              this.getOrgans();
            }
            else{
              console.log("hewayyy");
              this.organs=this.organs.filter(res=>{
                return res.nom.toLocaleLowerCase().match(this.terme.toLocaleLowerCase())
                && res.code.toLocaleLowerCase().match(this.terme.toLocaleLowerCase())
                && res.secteur_d_activite.toLocaleLowerCase().match(this.terme.toLocaleLowerCase())
                && res.pays.toLocaleLowerCase().match(this.terme.toLocaleLowerCase())
                && res.region.toLocaleLowerCase().match(this.terme.toLocaleLowerCase())
                && res.adresse.toLocaleLowerCase().match(this.terme.toLocaleLowerCase())
                && res.email.toLocaleLowerCase().match(this.terme.toLocaleLowerCase());
              })
            }
            
          }
        
      
     


         

        
          
  
    

}
