import { Component, OnInit } from '@angular/core';
import { Entreprise } from 'src/app/model/Entreprise';
import { Organisation } from 'src/app/model/Organisation';

@Component({
  selector: 'app-detail-organisation',
  templateUrl: './detail-organisation.component.html',
  styleUrls: ['./detail-organisation.component.css']
})
export class DetailOrganisationComponent implements OnInit {
 organisation!: Organisation;

  constructor() { }

  ngOnInit(): void {
  }
     
  

}
