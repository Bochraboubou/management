import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiServeUrl=environment.apiBaseUrl;
  constructor( private http:HttpClient) { }
  
  //trouver un user par l id de l'organisation:::presque absurde

 getUserByOrganisationID( idOrganisation:number):Observable<User>{
  return this.http.get<User>(`${this.apiServeUrl}/api/getOrganiation/${idOrganisation}`);
}
// trouver un user par son identifiant
getUserById(id:number):Observable<User>{
  return this.http.get<User>(`${this.apiServeUrl}/api/getById/${id}`);
}
getAllUsers():Observable<User[]>{
  return this.http.get<User[]>(`${this.apiServeUrl}/api/users`);
}
/***************** */
//la methode update user dans le Registerservice
/***************** */

//delete one user
DeleteUser(id:number):Observable<void>{
  return this.http.delete<void>(`${this.apiServeUrl}/api/deleteUser/${id}`);
}
// delete all users
DeleteAllUsers():Observable<void>{
  return this.http.delete<void>(`${this.apiServeUrl}/api/deleteAllUsers`);
}
}
