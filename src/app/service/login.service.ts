import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiServeUrl =environment.apiBaseUrl;
  constructor(private _http:HttpClient) { }

  public guestLogin(user:User): Observable<User>
  {
   return this._http.post<User>(`${this.apiServeUrl}/api/login`,user);
  }

  public getUser(_username:string): Observable<any>{
    return this._http.get<User>(`${this.apiServeUrl}/api/find/${_username}`);
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
