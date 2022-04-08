import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Organisation } from '../model/Organisation';
import { OrganisationServiceService } from '../service/organisation-service.service';

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.css']
})
export class OrganisationComponent implements OnInit {
  organisations!: Organisation[];
  
  terme:any;
  page:number = 1;
  totalLength:any;
  constructor(private organisationservice:OrganisationServiceService, private router:Router) { }

  ngOnInit(): void {
    this.getOrganisations();
  }
  getOrganisations(){
  this.organisationservice.getOrganisations().subscribe({
    next: (response:Organisation[]) => {
      this.organisations=response;
     console.log("il y des org")
    },
    error: (error:HttpErrorResponse) => {
      alert(error.message);
     },
    complete: () => console.info('complete') 
})
  
} 
  
goTODetail(id:number){
  this.router.navigate(['DetailOrg',id])
}
  
onAfficheDetailOrganisation(id:number){
  this.router.navigate(['DetailOrg',id])
} 
  /*
  public getOrganisations():void
  {
    this.organisationservice .getOrganisations().subscribe(
      (response:Organisation[])=>{
        this.organisations=response;
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
       }
    );

  }*/

}
