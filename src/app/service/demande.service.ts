import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Demande } from '../model/Demande';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  apiServeUrl=environment.apiBaseUrl;
  constructor(private http:HttpClient) { }

  public getDemandes(): Observable<Demande[]>
  {
    return this.http.get<Demande[]>(`${this.apiServeUrl}/api/demandes`);
  }
 
  public addDemande(demande:Demande): Observable<Demande> {
    return this.http.post<Demande>(`${this.apiServeUrl}/api/saveDemande`, demande);
  }
/*
  public updateDemande(demande: Demande): Observable<Demande> {
    return this.http.put<Demande>(`${this.apiServeUrl}/demande/update`, demande);
  }
  */

  public deleteDemande(demandeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServeUrl}/api/deleteDemande/${demandeId}`);
  }
  getDemandeById(demandeId:number):Observable<Demande>{
    return this.http.get<Demande>(`${this.apiServeUrl}/api/demande/find/${demandeId}`);

  }

 /* public addDemande2(formData:FormData): Observable<any> {
    return this.http.post(`${this.apiServeUrl}/api/saveDemandefile`, formData);
  }
  */

   updateDemande(id:number,demande:Demande):Observable<void>{
    return this.http.put<void>(`${this.apiServeUrl}/api/demande/${id}`, demande);
  }
  createDemande(formData:FormData): Observable<any> {
    return this.http.post(`${this.apiServeUrl}/api/demandenew`,formData);
  }
  
}
