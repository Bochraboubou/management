import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AttachementMC } from '../model/AttachementMC';

@Injectable({
  providedIn: 'root'
})
export class AttachementMCService {
  apiServeUrl=environment.apiBaseUrl
  constructor(private http:HttpClient) { }

  // getAll mc
  
  public getAllAttachementMC(): Observable<AttachementMC[]>
 {
   return this.http.get<AttachementMC[]>(`${this.apiServeUrl}/admin/getAllMCAttachement`);
 }
 // get by code 
 public getByCode(code:string): Observable<AttachementMC>
 {
   return this.http.get<AttachementMC>(`${this.apiServeUrl}/admin/getBYCode/${code}`);
 }
 // ajouter un  attachement marchee cadre 
 //nour 

 public addAttachementMC(ordreTraveauxId:number,attachementMC:AttachementMC): Observable<AttachementMC>
 {
   return this.http.post<AttachementMC>(`${this.apiServeUrl}/admin/ordreTraveaux/${ordreTraveauxId}/attachementMC`,attachementMC);
 }
}
