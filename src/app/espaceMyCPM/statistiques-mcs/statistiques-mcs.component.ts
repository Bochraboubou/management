import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { BondeCommande } from 'src/app/model/BondeCommande';
import { Marchee } from 'src/app/model/Marchee';
import { OrdreDeTraveaux } from 'src/app/model/OrdreDeTraveaux';
import { Organisation } from 'src/app/model/Organisation';
import { BondeCommandeService } from 'src/app/service/bonde-commande.service';
import { LoginService } from 'src/app/service/login.service';
import { MarcheeService } from 'src/app/service/marchee.service';
import { OrdreDeTraveauxService } from 'src/app/service/ordre-de-traveaux.service';
import { OrganisationServiceService } from 'src/app/service/organisation-service.service';

@Component({
  selector: 'app-statistiques-mcs',
  templateUrl: './statistiques-mcs.component.html',
  styleUrls: ['./statistiques-mcs.component.css']
})
export class StatistiquesMCsComponent implements OnInit {

  organisationConnectee!: Organisation;
  username!: string;
  marchees!: Marchee[];
  ordresDeTraveaux:OrdreDeTraveaux[]=[];

  idMarcheeC!: number;
  marcheeC!: Marchee;
  bondeCommandeC!: BondeCommande;

  statistiquesOTsChart:any;

  
  constructor(private loginService:LoginService,private organisationService:OrganisationServiceService,private marcheeService:MarcheeService,private bondeCommandeService:BondeCommandeService,private ordreTraveauxService:OrdreDeTraveauxService) { }

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
    this.getOrdresTraveaux(this.marcheeC.id); 
   // this.getStatistiquesBCs(this.marcheeC.id) ;
  }

   //récuperer la liste des marchhees dans l'organisation connecté
   public onGetmarchees():void{
    this.marcheeService.getMarcheestypeMCbyorganisationId(this.organisationConnectee.id).subscribe({
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


  //recuperer les ordres de traveaux du bc choisis
  public getOrdresTraveaux(marcheeId:number):void{
    this.ordreTraveauxService.getOTsByMarcheeId(marcheeId).subscribe({
     next: (response:OrdreDeTraveaux[]) =>{
       this.ordresDeTraveaux=response;
       console.log("ots du bc choisis "+this.bondeCommandeC?.codebc+" sont les suivants"+this.ordresDeTraveaux);
       this.getStatistiquesOTs(marcheeId);
       
     },
     error: (error:HttpErrorResponse) => {
       alert(error.message);

      },
     complete: () => console.info('get ots by bc complete') 
 })  

 }



 getRandomColor() {
  var color = Math.floor(0x1000000 * Math.random()).toString(16);
  return '#' + ('000000' + color).slice(-6);
}


   //récuperer les statistiques des BCs
   public getStatistiquesOTs(idMarchee:number):void{
    this.ordreTraveauxService.getStatistiquesOTs(idMarchee).subscribe({
     next: (response:any[]) =>{
       console.log("statistiques OTs du marchee "+this.marcheeC?.designiation+" sont les suivants"+response);
       let codesOTs :string[]=[];
       let montantsOTs :number[]=[];
       let montantsRealiseesOTs :number[]=[];
       for (var obj of response) {
        codesOTs.push(obj[0]);
        montantsOTs.push(obj[1]);
        montantsRealiseesOTs.push(obj[2]);
       }
       for (var ot of this.ordresDeTraveaux) {
        if(codesOTs.indexOf(ot.codeOrdre) == -1){
          codesOTs.push(ot.codeOrdre);
          montantsOTs.push(ot.montant);
          montantsRealiseesOTs.push(0);
        }
       }
       
       if (this.statistiquesOTsChart != undefined){
         this.statistiquesOTsChart.data.labels=codesOTs;
        this.statistiquesOTsChart.data.datasets[0].data=montantsOTs;
        this.statistiquesOTsChart.data.datasets[1].data=montantsRealiseesOTs;
        //this.statistiquesBCsChart.datasets[1]=montantsRealiseesBCs;
        this.statistiquesOTsChart.update();
       }
       else{
        this.statistiquesOTsChart= new Chart('statistiquesOTs', {
          type: 'bar',
          data: {
            labels: codesOTs,
            datasets: [{
              label: 'montant planifié des articles des BCs',
              data: montantsOTs,
              backgroundColor: 
              [this.getRandomColor()]
              , borderColor: [
                'rgb(255, 99, 132)',
              ],
              borderWidth: 1
            },
            {
              label: 'montant réalisés  des articles du BCs',
              data: montantsRealiseesOTs,
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
     complete: () => console.info('get statistiques OTs complete') 
 })  

 }

}
