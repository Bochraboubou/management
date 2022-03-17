import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Menu } from '../model/Menu';
import { Organisation } from '../model/Organisation';
import { OrganisationServiceService } from '../service/organisation-service.service';
import { PassageService } from '../service/passage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

//org=new Organisation();
//name:string='organisation';
id:any;

  constructor( private _service :OrganisationServiceService , private route:ActivatedRoute) { }

  ngOnInit(): void {
   //il existe deux type de passage par parametres:(istantannee & observable)
     }

}
