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

 
  public RegisterFromRemote( user :User,idorg:number,id_role:number):Observable<User>{
    return this._http.post<User>(`${this.apiServeUrl}/api/registerUser/${idorg}/role/${id_role}`,user);
  }
  //pour une premiere inscription : simple user
  public RegisterSimpleUser( user :User,idorg:number,id_role:number):Observable<User>{
    return this._http.post<User>(`${this.apiServeUrl}/api/registerSimpleUser/${idorg}/role/${id_role}`,user);
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


public findByUserName(username:string): Observable<User>
{
  return this._http.get<User>(`${this.apiServeUrl}/api/find/${username}`);
}
public findByEmail(email:string): Observable<User>
{
  return this._http.get<User>(`${this.apiServeUrl}/api/findbyEmail/${email}`);
}


//formData
createUser(formData:FormData,idorg:number,idrole:number): Observable<any> {
  return this._http.post(`${this.apiServeUrl}/api/userenew/${idorg}/role/${idrole}`,formData);
}

UpdateUser(formData:FormData,iduser:number): Observable<any> {
  return this._http.post(`${this.apiServeUrl}/api/updateSamedi/${iduser}`,formData);
}
}
