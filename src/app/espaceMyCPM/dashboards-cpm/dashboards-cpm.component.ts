import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit ,ViewChild} from '@angular/core';
import Chart from 'chart.js/auto';
import { BonDeLivraisonProjet } from 'src/app/model/Bon_De_Livraison';
import { Demande } from 'src/app/model/Demande';
import { DemandeService } from 'src/app/service/demande.service';
import { OrganisationServiceService } from 'src/app/service/organisation-service.service';
@Component({
  selector: 'app-dashboards-cpm',
  templateUrl: './dashboards-cpm.component.html',
  styleUrls: ['./dashboards-cpm.component.css']
})
export class DashboardsCPMComponent implements OnInit {
listeDemandes!:Demande[]
OrgUserChart:any
  constructor( private serviceDemande:DemandeService, private orgService:OrganisationServiceService) { }

  ngOnInit(): void {
    this.CountUsersOfOrg();
  }

  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }
CountUsersOfOrg(){
  this.orgService.CountUsersOfOrg().subscribe({
    next: (response:any[]) =>{
      console.log(" affichage du res"+response);
      let NomOrgs:string[]=[];// nom des organisation
      let countUsers :number[]=[];//numbre of  users
      let couleursMetier :string[]=[];
      for (var obj of response) {
        console.log(obj)
        NomOrgs.push(obj[0]);//nom
        countUsers.push(obj[1]);//qte
       couleursMetier.push(this.getRandomColor());
      }
       this.OrgUserChart= new Chart('countUser', {
         type: 'bar',
         data: { 
           labels: NomOrgs,
           datasets: [{
             label: 'nombre d utilisateur par organisation',
             data: countUsers,
             backgroundColor: 
             couleursMetier
             , borderColor:
              [
               'rgb(255, 99, 132)',
             ],
             borderWidth: 1
           }],
   
          },
        })
        console.log("organisations : "+NomOrgs)
         
 
   
      },
      error: (error:HttpErrorResponse) => {
        console.log(error.message);
        
      
       },
      complete: () => console.info('complete')  
    })
 

  

}






















  
DemandesEnAttente(){
  this.serviceDemande.DemandesEnAttente().subscribe({
    next: (response:Demande[]) =>{
     this.listeDemandes=response
     console.log(this.listeDemandes)
  
     },
     error: (error:HttpErrorResponse) => {
       console.log(error.message);
       
     
      },
     complete: () => console.info('complete')  
   })

}
}
