import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ArticleUtilisee } from '../model/ArticleUtilisee';
import { BondeCommandeService } from '../service/bonde-commande.service';

@Component({
  selector: 'app-menu-mycpm',
  templateUrl: './menu-mycpm.component.html',
  styleUrls: ['./menu-mycpm.component.css']
})
export class MenuMycpmComponent implements OnInit {
  artsuts!: ArticleUtilisee[];

  constructor(private bcservice:BondeCommandeService) { }

  ngOnInit(): void {
  }
  showme():void{
      this.bcservice.getArticlesUtilisees().subscribe({
        next: (response:ArticleUtilisee[]) => {
          this.artsuts=response;
          console.log(response);
          console.log("id bc est   "+this.artsuts[1].id.bondecommande_id);
          console.log("id bc est   "+this.artsuts[1].id.article_id);
          
          
        },
        error: (error:HttpErrorResponse) => {
          alert(error.message);
         },
        complete: () => console.info('complete') 
    })

  }

}
