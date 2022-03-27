import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Role } from 'src/app/model/Role';
import { User } from 'src/app/model/User';
import { RegisterService } from 'src/app/service/register.service';
import { RoleService } from 'src/app/service/role.service';

@Component({
  selector: 'app-gerer-comptes',
  templateUrl: './gerer-comptes.component.html',
  styleUrls: ['./gerer-comptes.component.css']
})
export class GererComptesComponent implements OnInit {
  roles!:Role[];
  id_org!:number;
  idRole!:number;
  user=new User()
  constructor( private roleService:RoleService, private _service:RegisterService) { }

  ngOnInit(): void {
    this.getAllRoles();
}


  getAllRoles(){
    this.roleService.findAll().subscribe({
      next: (response:Role[]) => {
        this.roles=response;
        //console.log("roles...");
      
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);
       },
      complete: () => console.info('complete') 
  })
  }
  AjouterEmployee(addForm: NgForm){
    //recuperer le code de l'orgasition 
    this.id_org=3
    console.log("nooor")
    console.log(this.user.name)
   

}
getEmployee(){

}
  
}
