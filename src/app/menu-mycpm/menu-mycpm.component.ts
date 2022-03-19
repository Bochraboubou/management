import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleUtilisee } from '../model/ArticleUtilisee';
import { Organisation } from '../model/Organisation';
import { BondeCommandeService } from '../service/bonde-commande.service';
import { OrganisationServiceService } from '../service/organisation-service.service';

@Component({
  selector: 'app-menu-mycpm',
  templateUrl: './menu-mycpm.component.html',
  styleUrls: ['./menu-mycpm.component.css']
})
export class MenuMycpmComponent implements OnInit {
  artsuts!: ArticleUtilisee[];
  code!:string;
organisation!:Organisation
org=new Organisation();
  constructor(private bcservice:BondeCommandeService ,private route:ActivatedRoute,private organisationService:OrganisationServiceService) { }

  ngOnInit(): void {
    this.code=this.route.snapshot.params['code'];
    this.organisation=new Organisation();
    this.organisationService.getOrganisationbyCode(this.code).subscribe(
      data=>{
        this.organisation=data;

    }
    )


  }
  showme():void{
      this.bcservice.getArticlesUtilisees().subscribe({
        next: (response:ArticleUtilisee[]) => {
          this.artsuts=response;
          console.log(response);
          console.log("id bc est   "+this.artsuts[1].id.bondecommande_id);
          
        },
        error: (error:HttpErrorResponse) => {
          alert(error.message);
         },
        complete: () => console.info('complete') 
    })

  }

}
