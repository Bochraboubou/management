import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role } from '../model/Role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  apiServeUrl=environment.apiBaseUrl;
  constructor(private http:HttpClient) { }

// trouver le role d'un user
public findRoleOfUser(idUser:number):Observable<Role[]>{
  return this.http.get<Role[]>(`${this.apiServeUrl}/api/getRoleUser/${idUser}`);
}

// trouver le role d'un user
public findAll():Observable<Role[]>{
  return this.http.get<Role[]>(`${this.apiServeUrl}/api/roles/`);
}
//trouver tous les roles sauf admin et Simple
public trouverRolesSaufadminEtSimple():Observable<Role[]>{
  return this.http.get<Role[]>(`${this.apiServeUrl}/api/getRolesSoufAdminEtSimple`);
}
}
