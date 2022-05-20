import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Secteur } from '../model/Secteur';

@Injectable({
  providedIn: 'root'
})
export class SecteurService {
  private apiServeUrl =environment.apiBaseUrl;

  constructor(private http: HttpClient) { }
  public addSecteur(secteur:Secteur): Observable<Secteur>
  {
    return this.http.post<Secteur>(`${this.apiServeUrl}/admin/secteurs`,secteur);
  }

  public getSecteurs(): Observable<Secteur[]>
  {
    return this.http.get<Secteur[]>(`${this.apiServeUrl}/admin/secteurs`);
  }

  public editSecteur(secteurId:number,secteur:Secteur): Observable<Secteur>
  {
    return this.http.put<Secteur>(`${this.apiServeUrl}/admin/secteurs/${secteurId}`,secteur);
  }

  public deleteSecteur(secteurId:number): Observable<void>
  {
    return this.http.delete<void>(`${this.apiServeUrl}/admin/secteurs/${secteurId}`);
  }

  //récuperer le secteur par nom
  public getSecteurbyNom(nomSecteur:string): Observable<Secteur>
  {
    return this.http.get<Secteur>(`${this.apiServeUrl}/admin/secteurbynom/${nomSecteur}`);
  }

   //récuperer le secteur par Id
   public getSecteurbyId(idSecteur:number): Observable<Secteur>
   {
     return this.http.get<Secteur>(`${this.apiServeUrl}/admin/secteurbyId/${idSecteur}`);
   }
   //récuperer le secteur par Id
   public DeleteSecteurbyId(idSecteur:number):  Observable<void> 
   {
     return this.http.delete<void>(`${this.apiServeUrl}/admin/secteurs/${idSecteur}`);
   }

// pour les statistique 
// nombre des métiers dans chaque secteur 

public CountMétierOfSecteur(): Observable<any[]>
{
  return this.http.get<any[]>(`${this.apiServeUrl}/admin/secteurParMetier`);
}
}
