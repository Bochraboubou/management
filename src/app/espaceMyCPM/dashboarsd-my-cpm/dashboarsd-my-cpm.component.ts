import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit,ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { Organisation } from 'src/app/model/Organisation';
import { LoginService } from 'src/app/service/login.service';
import { MarcheeService } from 'src/app/service/marchee.service';
import { OrganisationServiceService } from 'src/app/service/organisation-service.service';

@Component({
  selector: 'app-dashboarsd-my-cpm',
  templateUrl: './dashboarsd-my-cpm.component.html',
  styleUrls: ['./dashboarsd-my-cpm.component.css']
})
export class DashboarsdMyCPMComponent implements OnInit {
  marcheeParMetierChart: any;
  ctxMPM: any;

  nombreMarchees: any;
  ctxNM: any;

  @ViewChild('countMarcheeByMetier') countMarcheeByMetier:any;
  username!: string;
  listCountMarchees!: Array<any>;
  metiersdesMarchees: string[] =[];
  countMarchees: number[] =[];
  bochraData:number[]=[1,5,7,8,13,45];
  organisationConnectee!: Organisation;

  constructor(private loginService:LoginService,private marcheeService:MarcheeService,private organisationService:OrganisationServiceService) { }

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
        this.countMarcheesparMetier();
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);

       },
      complete: () => console.info('complete') 
  })
  }

   //count marchees by metier
   public countMarcheesparMetier():void{
    this.marcheeService.countMarcheeByMetier(this.organisationConnectee.id).subscribe({
     next: (response:Array<any>) =>{
       this.listCountMarchees=response;
       console.log(" count marchees par metier "+this.listCountMarchees);
       for (var obj of response) {
        this.metiersdesMarchees.push(obj[0]);
        this.countMarchees.push(obj[1]);
       }
        this.marcheeParMetierChart = this.countMarcheeByMetier.nativeElement; 
        this.ctxMPM = this.marcheeParMetierChart.getContext('2d');
    
        new Chart(this.ctxMPM, {
          type: 'bar',
          data: {
            labels: this.metiersdesMarchees,
            datasets: [{
              label: 'nombre de marchés par métier',
              data: this.countMarchees,
              backgroundColor: [
               '#F8A893'
              ], borderColor: [
                'rgb(255, 99, 132)',
              ],
              borderWidth: 1
            }],
    
          },
      })
      console.log("metiers : "+this.metiersdesMarchees)
       
     },
     error: (error:HttpErrorResponse) => {
       alert(error.message);

      },
     complete: () => console.info('count marchees complete') 
 })  

 }

 //nombres de marchees de type projet et Marché cadre
 public getNobreMarchees(){
  this.nombreMarchees = this.nombreMarchees.nativeElement; 
  this.ctxNM = this.nombreMarchees.getContext('2d');

  new Chart(this.ctxNM, {
    type: 'bar',
    data: {
      datasets: [{
        label: 'My First Dataset',
        data: this.countMarchees,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ], borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }],
        labels: ['January 2019', 'February 2019', 'March 2019', 'nour','bochra','lamine','ameni']
    },
});

 }

  
  
 

 /* ngAfterViewInit() {
   ;
  }
  */

}
