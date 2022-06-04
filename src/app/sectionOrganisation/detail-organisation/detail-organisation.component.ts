import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Organisation } from 'src/app/model/Organisation';
import { OrganisationServiceService } from 'src/app/service/organisation-service.service';

@Component({
  selector: 'app-detail-organisation',
  templateUrl: './detail-organisation.component.html',
  styleUrls: ['./detail-organisation.component.css']
})
export class DetailOrganisationComponent implements OnInit {
 organisation!: Organisation;
 id!:number;

  constructor(private route:ActivatedRoute,public service:OrganisationServiceService) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
       this.organisation=new Organisation();
       this.service.getOrganisationbyId(this.id).subscribe(
         data=>{
           this.organisation=data;
           console.log(this.organisation.nom)
          
         }
       )
      
  }
     
  
  public onOpeAfficheModal():void{
    const container=document.getElementById('main-container');
     const button=document.createElement('button');
     button.type='button';
     button.style.display='none';
     button.setAttribute('data-toggle','modal');
     button.setAttribute('data-target','#affDocument');
     container?.appendChild(button);
     button.click();
 
   }
}
