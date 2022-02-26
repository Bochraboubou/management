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
}
