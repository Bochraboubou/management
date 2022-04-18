import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Secteur } from 'src/app/model/Secteur';
import { SecteurService } from 'src/app/service/secteur.service';

@Component({
  selector: 'app-secteur',
  templateUrl: './secteur.component.html',
  styleUrls: ['./secteur.component.css']
})
export class SecteurComponent implements OnInit {

secteur!:Secteur;
secteurs!:Secteur[];

  constructor( private secteurServ:SecteurService ) { }

  ngOnInit(): void {
    this.getSecteurs();
}
DeleteSecteur(id:number){
  this.secteurServ.DeleteSecteurbyId(id).subscribe(
    (response:any)=>{
      this.secteurs=response;
      console.log("c bon tfass5et")
      this.getSecteurs();
    },
    (error:HttpErrorResponse)=>{
      alert(error.message);
      console.log("erreur")
     }
  )
  

}
onAffichelMitier(id:number){

}
getSecteurs(){
  this.secteurServ.getSecteurs().subscribe(
    (response:Secteur[])=>{
      this.secteurs=response;
    },
    (error:HttpErrorResponse)=>{
      alert(error.message);
     }
  )
}
DeleteAll(){
  
}

}
