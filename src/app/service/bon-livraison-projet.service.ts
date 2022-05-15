import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article } from '../model/Article';
import { BonDeLivraisonProjet } from '../model/Bon_De_Livraison';

@Injectable({
  providedIn: 'root'
})
export class BonLivraisonProjetService {
  private apiServeUrl =environment.apiBaseUrl;

  constructor(private http: HttpClient) { }


  //récuperer les bons de livraison by bcId
  public getAllbonsdelivraisonsBybcId(bcId:number): Observable<BonDeLivraisonProjet[]>
  {
    return this.http.get<BonDeLivraisonProjet[]>(`${this.apiServeUrl}/admin/AllbonsdelivraisonsdeProjet/${bcId}`);
  }

    //récuperer le materiel livré dans BL de projet
    public getMaterielsBuBL(blId:number): Observable<Article[]>
    {
      return this.http.get<Article[]>(`${this.apiServeUrl}/admin/materielLivreeJoinProjetbyBC/bl/${blId}`);
    }

}