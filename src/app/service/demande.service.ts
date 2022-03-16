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

  public updateDemande(demande: Demande): Observable<Demande> {
    return this.http.put<Demande>(`${this.apiServeUrl}/employee/update`, demande);
  }

  public deleteDemande(demandeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServeUrl}/employee/delete/${demandeId}`);
  }
}
