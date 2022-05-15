import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MLivProj } from '../model/MLivProj';

@Injectable({
  providedIn: 'root'
})
export class MateriellivreeProjetService {
  apiServeUrl=environment.apiBaseUrl
  constructor( private http:HttpClient) { }

    //add materiel livree 
    public addMaterielProjet(idBl:number,idArt:number, materielProjet:MLivProj): Observable<MLivProj>
    {
      return this.http.post<MLivProj>(`${this.apiServeUrl}/admin/bondesLivraison/${idBl}/article/${idArt}/MaterielLivree`,materielProjet);
    }
}
