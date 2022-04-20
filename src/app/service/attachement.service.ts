import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Attachement } from '../model/Attachement';

@Injectable({
  providedIn: 'root'
})
export class AttachementService {

  private apiServeUrl =environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

// ajouterAttachement
public addAttachement(attachement:Attachement,idBC:number): Observable<Attachement>
{
  return this.http.post<Attachement>(`${this.apiServeUrl}/admin/addAttachement/${idBC}`,attachement);
}


public DeleteAttachement(id:number): Observable<void>
{
  return this.http.delete<void>(`${this.apiServeUrl}/admin/deleteAttachement/${id}`);
}

//get attachement by code
public getAttachementByCode(code:string): Observable<Attachement>
 {
   return this.http.get<Attachement>(`${this.apiServeUrl}/admin/byCode2/${code}/`);
 }

 public getAttachementById(id:number): Observable<Attachement>
 {
   return this.http.get<Attachement>(`${this.apiServeUrl}/admin/byCode2/${id}/`);
 }
// find all attachement

public getAllAttachement(): Observable<Attachement[]>
 {
   return this.http.get<Attachement[]>(`${this.apiServeUrl}/admin/allAttachement`);
 }
}
