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
  @ViewChild('countMarcheeByMetier') countMarcheeByMetier:any;
  @ViewChild('nombreMarchees')nombreMarchees:any;
  marcheeParMetierChart: any;


  nombreMarcheesChart:any;


 
  username!: string;
  listCountMarchees!: Array<any>;
  metiersdesMarchees: string[] =[];
  countMarchees: number[] =[];
  bochraData:number[]=[1,5,7,8,13,45];
  organisationConnectee!: Organisation;
  typesMarchee!: string[];
  nombreMarcheesParType!: number[];

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
        this.getNombreMarchees();
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
        this.marcheeParMetierChart= new Chart('countMarcheeByMetier', {
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
 public getNombreMarchees(){
    this.marcheeService.countMarcheeByType(this.organisationConnectee.id).subscribe({
     next: (response:Array<any>) =>{
      this.listCountMarchees=response;
      console.log(" count marchees par type "+response);
      let  typesMarchee:string[]=[];
      let nombreMarcheesParType:number[]=[];
      for (var obj of response) {
       typesMarchee.push(obj[0]);
       nombreMarcheesParType.push(obj[1]);
      }
      this.nombreMarcheesChart= new Chart('nombreMarchees', {
        type: 'pie',
        options:{
          responsive:true,
         animation:{
           animateScale:true,
           animateRotate:true
         }
        },
        data: {
          labels: typesMarchee,
          datasets:  [
            {
              label: 'nombre de marchés',
              data: nombreMarcheesParType,
              backgroundColor:["#F53F1B","#1BBDF5"],
            }
          ],
           
        },
    });
    
       
     },
     error: (error:HttpErrorResponse) => {
       alert(error.message);

      },
    complete: () => console.info('count Projets complete') 
 })  

 }

  
  
 

 /* ngAfterViewInit() {
   ;
  }
  */

}
