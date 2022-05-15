import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BonDeLivraisonProjet } from '../model/Bon_De_Livraison';

@Injectable({
  providedIn: 'root'
})
export class BonLivraisonProjetService {
  apiServeUrl=environment.apiBaseUrl
  constructor( private http:HttpClient) { }

  //ajouter BL
  //addBonLivraison
  public addBLProjet(blp:BonDeLivraisonProjet,idBC:number): Observable<BonDeLivraisonProjet>
{
  return this.http.post<BonDeLivraisonProjet>(`${this.apiServeUrl}/admin/addBonLivraison/${idBC}`,blp);
}
}
