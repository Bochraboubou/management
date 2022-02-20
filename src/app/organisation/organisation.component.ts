import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Organisation } from '../model/Organisation';
import { OrganisationServiceService } from '../service/organisation-service.service';

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.css']
})
export class OrganisationComponent implements OnInit {
  organisations!: Organisation[];
  

  constructor(private organisationservice:OrganisationServiceService) { }

  ngOnInit(): void {
    this.getOrganisations();
  }
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

  }

}
