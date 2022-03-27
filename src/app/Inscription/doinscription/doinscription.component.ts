import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Demande } from 'src/app/model/Demande';
import { Secteur } from 'src/app/model/Secteur';
import { DemandeService } from 'src/app/service/demande.service';
import { SecteurService } from 'src/app/service/secteur.service';

@Component({
  selector: 'app-doinscription',
  templateUrl: './doinscription.component.html',
  styleUrls: ['./doinscription.component.css']
})
export class DoinscriptionComponent implements OnInit {
demande=new Demande();
demandes !:Demande[];
secteurs!:Secteur[]
imgURL:any;
userFile:any;
 message:string='';
 

public imagePath:any;
  constructor( private _servicedemande:DemandeService, private secteurService:SecteurService) { }

  ngOnInit(): void {
    this.getSecteurs();

  }






  // methode pour l' upload d'image


  public onAddDemande(addForm: NgForm): void {


    const formData=new FormData();
    const demande=addForm.value;
    formData.append('demande',JSON.stringify(demande));
    formData.append('file',this.userFile)
    
 
     this._servicedemande.createDemande(formData).subscribe(
       (response: Demande) => {
         console.log(response);
         console.log("accepteeeee");
        addForm.reset();
       },
       (error: HttpErrorResponse) => {
         alert(error.message);
         console.log("erreur");
         //addForm.reset();
       }
     );
     /*
     // document.getElementById('add-employee-form').click();
     this._servicedemande.addDemande(addForm.value).subscribe(
       (response: Demande) => {
         console.log(response);
         console.log("accepteeeee");
        addForm.reset();
       },
       (error: HttpErrorResponse) => {
         alert(error.message);
         console.log("erreur");
         //addForm.reset();
       }
     );
     */
   
}



onSelectFile(event:any){
  if (event.target.files.length>0){
    const file=event.target.files[0];
    this.userFile=file;
    //this.f['profile'].setValue(file);
    var mimeType =event.target.files[0].type;
    if(mimeType.match(/image\/*/)==null){
 this.message="Only images are suported.";
 return;
    }
    var reader= new FileReader();
    this.imagePath=file;
    reader.readAsDataURL(file);
    reader.onload=(_event)=>{
      this.imgURL=reader.result;
    }
  }
   }
   

/*public onAddDemande(addForm: NgForm): void {
  // document.getElementById('add-employee-form').click();

  const demande=addForm.value;
  const formData=new FormData();
  formData.append('user',JSON.stringify(demande));
  formData.append('file',this.userFile);
   this._servicedemande.addDemande2(formData).subscribe(
     (response: Demande) => {
       console.log(response);
       console.log("accepteeeee");
      addForm.reset();
     },
     (error: HttpErrorResponse) => {
       alert(error.message);
       console.log("erreur");
      
     }
   );
 
}*/

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


    


  // 5edmet abbes(video)
 /* if( event.target.files.length>0){
    const file=event.target.files[0];
    this.userFile=file;
    //this.f['profile].setValue(file)
    var mimeType=event.target.files[0];*/
   // if(mimeType.match(/image\*/)==null){
     /* this.message="only images are supported";
      return;
    }



    var reader=new FileReader();
    this.imagePath=file;
    reader.readAsDataURL(file);
    reader.onload=(_event)=>{
      this.imgURL=reader.result;
    }
  }

}*/



}
  
