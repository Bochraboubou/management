import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit,ViewChild } from '@angular/core';
import { BondeCommande } from 'src/app/model/BondeCommande';
import { Marchee } from 'src/app/model/Marchee';
import { Organisation } from 'src/app/model/Organisation';
import { BondeCommandeService } from 'src/app/service/bonde-commande.service';
import { LoginService } from 'src/app/service/login.service';
import { MarcheeService } from 'src/app/service/marchee.service';
import { OrganisationServiceService } from 'src/app/service/organisation-service.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-statistiques-projets',
  templateUrl: './statistiques-projets.component.html',
  styleUrls: ['./statistiques-projets.component.css']
})
export class StatistiquesProjetsComponent implements OnInit {

  organisationConnectee!: Organisation;
  username!: string;
  marchees!: Marchee[];
  bonsdeCommandes: BondeCommande[]=[];

  idMarcheeC!: number;
  marcheeC!: Marchee;
  bondeCommandeC!: BondeCommande;

  statistiquesBCsChart:any;

  
  constructor(private loginService:LoginService,private organisationService:OrganisationServiceService,private marcheeService:MarcheeService,private bondeCommandeService:BondeCommandeService) { }

  ngOnInit(): void {
    this.onGetOrganisationbyUser();
    
  }

   //récuperer l'organisation connecté actuellement
   public onGetOrganisationbyUser():void{
    this.username=this.loginService.loggedUser;
    this.organisationService.getOrganisationbyUserName(this.username).subscribe({
      next: (response:Organisation) => {
        this.organisationConnectee=response;
        console.log("organisation conectee"+this.organisationConnectee);
        this.onGetmarchees();
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);

       },
      complete: () => console.info('complete') 
  })
  }

  //event lors du choix du code du marché
  getMarcheeChoisis(marcheeIndice:number){
    console.log("indice du marchee choisis"+marcheeIndice);
    this.marcheeC=this.marchees[marcheeIndice];
    this.getBondesCommandes(this.marcheeC.id); 
   // this.getStatistiquesBCs(this.marcheeC.id) ;
  }

 

   //récuperer la liste des marchhees dans l'organisation connecté
   public onGetmarchees():void{
    this.marcheeService.getMarcheestypeProjetbyorganisationId(this.organisationConnectee.id).subscribe({
      next: (response:Marchee[]) => {
        this.marchees=response;
        console.log("marchees de l'organisation connecté"+this.marchees)
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);

       },
      complete: () => console.info('complete') 
  })
  }

   //recuperer les bon de commandes du marchee choisis
   public getBondesCommandes(idMarchee:number):void{
    this.bondeCommandeService.getAllBondeCommandeJoinbyMarcheeId(idMarchee).subscribe({
     next: (response:BondeCommande[]) =>{
       this.bonsdeCommandes=response;
       console.log("bon de commandes du marchee choisis "+this.marcheeC?.designiation+" sont les suivants"+this.bonsdeCommandes);
       this.getStatistiquesBCs(idMarchee);
       
     },
     error: (error:HttpErrorResponse) => {
       alert(error.message);

      },
     complete: () => console.info('get bondes commandes by marchee and organisation complete') 
 })  

 }


 getRandomColor() {
  var color = Math.floor(0x1000000 * Math.random()).toString(16);
  return '#' + ('000000' + color).slice(-6);
}


   //récuperer les statistiques des BCs
   public getStatistiquesBCs(idMarchee:number):void{
    this.bondeCommandeService.getStatistiques(idMarchee).subscribe({
     next: (response:any[]) =>{
       console.log("statistiques BCs du marchee "+this.marcheeC?.designiation+" sont les suivants"+response);
       let codesBCs :string[]=[];
       let montantsBCs :number[]=[];
       let montantsRealiseesBCs :number[]=[];
       for (var obj of response) {
        codesBCs.push(obj[0]);
        montantsBCs.push(obj[1]);
        montantsRealiseesBCs.push(obj[2]);
       }
       for (var bc of this.bonsdeCommandes) {
        if(codesBCs.indexOf(bc.codebc) == -1){
          codesBCs.push(bc.codebc);
          montantsBCs.push(bc.montant);
          montantsRealiseesBCs.push(0);
        }
       }
       
       if (this.statistiquesBCsChart != undefined){
         this.statistiquesBCsChart.data.labels=codesBCs;
        this.statistiquesBCsChart.data.datasets[0].data=montantsBCs;
        this.statistiquesBCsChart.data.datasets[1].data=montantsRealiseesBCs;
        //this.statistiquesBCsChart.datasets[1]=montantsRealiseesBCs;
        this.statistiquesBCsChart.update();
       }
       else{
        this.statistiquesBCsChart= new Chart('statistiquesBCs', {
          type: 'bar',
          data: {
            labels: codesBCs,
            datasets: [{
              label: 'montant planifié des articles des BCs',
              data: montantsBCs,
              backgroundColor: 
              [this.getRandomColor()]
              , borderColor: [
                'rgb(255, 99, 132)',
              ],
              borderWidth: 1
            },
            {
              label: 'montant réalisés  des articles du BCs',
              data: montantsRealiseesBCs,
              backgroundColor: 
              [this.getRandomColor()]
              , borderColor: [
                'rgb(255, 99, 132)',
              ],
              borderWidth: 1
            }
          ],
    
          },
        }) 
       } 
    },
     error: (error:HttpErrorResponse) => {
       alert(error.message);

      },
     complete: () => console.info('get statistiques BCs complete') 
 })  

 }
}
