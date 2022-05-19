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
  countEntreprisesChart:any;


 
  username!: string;
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
        this.countEntreprises();
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);

       },
      complete: () => console.info('complete') 
  })
  }

  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

   //count marchees by metier
   public countMarcheesparMetier():void{
    this.marcheeService.countMarcheeByMetier(this.organisationConnectee.id).subscribe({
     next: (response:Array<any>) =>{
       console.log(" count marchees par metier "+response);
       let metiersdesMarchees :string[]=[];
       let countMarchees :number[]=[];
       let couleursMetier :string[]=[];
       for (var obj of response) {
        metiersdesMarchees.push(obj[0]);//nom
        countMarchees.push(obj[1]);//qte
        couleursMetier.push(this.getRandomColor());
       }
        this.marcheeParMetierChart= new Chart('countMarcheeByMetier', {
          type: 'bar',
          data: { 
            labels: metiersdesMarchees,
            datasets: [{
              label: 'nombre de marchés par métier',
              data: countMarchees,
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
      console.log("metiers : "+metiersdesMarchees)
       
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
              backgroundColor:[this.getRandomColor(),this.getRandomColor()],
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

  //nombres de marchees de type projet et Marché cadre
  public countEntreprises(){
    this.organisationService.countEntreprises(this.organisationConnectee.id).subscribe({
     next: (response:any[]) =>{
      console.log(" count entreprises "+response);
      let  nomEntreprises:string[]=[];
      let countEntreprisesFournisseurs:number[]=[];
      let colorsEntreprise:string[]=[];
      
      for (var obj of response) {
       nomEntreprises.push(obj[0]);
       countEntreprisesFournisseurs.push(obj[1]);
       colorsEntreprise.push(this.getRandomColor());
      }
      this.countEntreprisesChart= new Chart('countEntreprises', {
        type: 'doughnut',
        options:{
          responsive:true,
         animation:{
           animateScale:true,
           animateRotate:true
         },
        },
        data: {
          labels: nomEntreprises,
          datasets:  [
            {
              label: 'nombre des BC fournis par l entreprise',
              data: countEntreprisesFournisseurs,
              backgroundColor:colorsEntreprise,
            }
          ],
           
        },
    });
    
       
     },
     error: (error:HttpErrorResponse) => {
       alert(error.message);

      },
    complete: () => console.info('count entreprises complete') 
 })  

 }

  
  
 

 /* ngAfterViewInit() {
   ;
  }
  */

}
