import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Metier } from '../model/Metier';

@Injectable({
  providedIn: 'root'
})
export class MetierService {
  private apiServeUrl =environment.apiBaseUrl;

  constructor(private http: HttpClient) { }
  public addMetier(secteurId:number,metier:Metier): Observable<Metier>
  {
    return this.http.post<Metier>(`${this.apiServeUrl}/admin/secteurs/${secteurId}/metiers`,metier);
  }

  public getMetiersBySecteur(secteurId:number): Observable<Metier[]>
  {
    return this.http.get<Metier[]>(`${this.apiServeUrl}/admin/secteurs/${secteurId}/metiers`);
  }

  public deleteMetier(metierId:number): Observable<void>
  {
    return this.http.delete<void>(`${this.apiServeUrl}/admin/metiers/${metierId}`);
  }

   //récuperer le metier par nom
   public getMetierbyNom(nomMetier:string): Observable<Metier>
   {
     return this.http.get<Metier>(`${this.apiServeUrl}/admin/metierbynom/${nomMetier}`);
   }

    //récuperer le metier par id
    public getMetierbyId(idMetier:number): Observable<Metier>
    {
      return this.http.get<Metier>(`${this.apiServeUrl}/admin/metierbyid/${idMetier}`);
    }
 
}
