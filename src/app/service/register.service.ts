import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Email } from '../model/Email';
import { Organisation } from '../model/Organisation';
import { Role } from '../model/Role';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  apiServeUrl=environment.apiBaseUrl;
  constructor(private _http:HttpClient) { }


  public RegisterFromRemote( user :User):Observable<User>{
    return this._http.post<User>(`${this.apiServeUrl}/api/registerUser`,user);
  }

  public getRoles(  ):Observable<Role[]>
  {
    return this._http.get<Role[]>(`${this.apiServeUrl}/api/roles`);
  }



  // passage par variable 
public RedirectToOrganisation(organId:number): Observable<Organisation>
{
  return this._http.get<Organisation>(`${this.apiServeUrl}/admin/oneorganisations/${organId}`);
}

public envoyerUnEmail(email:Email): Observable<any>
{let headers = new Headers({ 'Content-Type': 'application/json' });
  return this._http.post<any>("http://localhost:8085/api/sendEmail",email,{responseType: "json"});
}
}
