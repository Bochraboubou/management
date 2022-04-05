import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role } from '../model/Role';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiServeUrl =environment.apiBaseUrl;
  public loggedUser!:string;
  public isloggedIn: Boolean = false;
  public roles!:Role[];
  
 
  constructor(private _http:HttpClient, private router:Router) { }

  public guestLogin(user:User): Observable<User>
  {
   return this._http.post<User>(`${this.apiServeUrl}/api/login`,user);
  }

  public getUser(_username:string): Observable<any>{
    return this._http.get<User>(`${this.apiServeUrl}/api/find/${_username}`);
  }
// trouver les nouveau employee
  public getNewEmployees(idOrganisation:number): Observable<User[]>
  {
    return this._http.get<User[]>(`${this.apiServeUrl}/api/trouverEmployee/${idOrganisation}`);
  }
//donner un role a un employee
  public AddRoleToEmployee(username:string,rolename:string): Observable<User>
  {
    return this._http.get<User>(`${this.apiServeUrl}/api/addroles/${username}/role/${rolename}`);
  }





  logout() {
    this.isloggedIn= false;
    this.loggedUser="undefined";
    //this.roles =undefined;
    localStorage.removeItem('loggedUser');
    localStorage.setItem('isloggedIn',String(this.isloggedIn));
    this.router.navigate(['/login']);
    }
    

  signIn(user :User){
    this.loggedUser = user.username;
    this.isloggedIn = true;
    this.roles = user.roles;
    localStorage.setItem('loggedUser',this.loggedUser);
    localStorage.setItem('isloggedIn',String(this.isloggedIn));
    }

    isAdminCPM():Boolean{
      let admin: Boolean = false;
      if (!this.roles) //this.roles== undefiened
      return false;
      console.log(this.roles)
      this.roles.forEach((curRole) => {
      if(curRole.name =='ADMIN-CPM') {
      admin = true;
      }
      });
      return admin;
      }


      isAdminMYCPM():Boolean{
        let adminmycpm: Boolean = false;
        if (!this.roles) //this.roles== undefiened
        return false;
        this.roles.forEach((curRole) => {
        if(curRole.name =='ADMIN_MYCPM') {
        adminmycpm = true;
        }
        });
        return adminmycpm;
        }
      
        isEmployeeAchat():Boolean{
          let achat: Boolean = false;
          if (!this.roles) //this.roles== undefiened
          return false;
          this.roles.forEach((curRole) => {
          if(curRole.name =='ACHAT') {
          achat = true;
          }
          });
          return achat;
          }



      isChefProjet():Boolean{
        let chef: Boolean = false;
        if (!this.roles) //this.roles== undefiened
        return false;
        this.roles.forEach((curRole) => {
        if(curRole.name =='CHEF-PROJET') {
        chef= true;
        }
        });
        return chef;
        }
    
      




/*
//passage par parametres : juste !!
public guestLogin( _username:string,_password:string): Observable<User>
  {
    let parametres = new HttpParams();
   parametres = parametres.append('username', _username);
   parametres = parametres.append('password', _password);
    return this._http.get<User>(`${this.apiServeUrl}/api/login`,{ params: parametres });
  }
*/


}
