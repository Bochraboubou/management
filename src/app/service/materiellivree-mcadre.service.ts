import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MLivMC } from '../model/MLivMC';

@Injectable({
  providedIn: 'root'
})
export class MateriellivreeMCadreService {
  apiServeUrl=environment.apiBaseUrl
  constructor( private http:HttpClient) { }
   //add materiel livree   
   public addMaterielMC(idBl:number,idArt:number, materielMC:MLivMC): Observable<MLivMC>
   {
     return this.http.post<MLivMC>(`${this.apiServeUrl}/admin/bondLivraisonMC/${idBl}/article/${idArt}/MaterielLivreeMC`,materielMC);
   }
}
