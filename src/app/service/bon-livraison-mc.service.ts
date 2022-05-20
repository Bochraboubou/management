import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article } from '../model/Article';
import { BonDeLivraisonMC } from '../model/Bon_De_livraisonMC';

@Injectable({
  providedIn: 'root'
})
export class BonLivraisonMCService {
  private apiServeUrl =environment.apiBaseUrl;

  constructor(private http: HttpClient) { }
  
  //récuperer les bons de livraison by bcId
  public getAllbonsdelivraisonsByotId(otId:number): Observable<BonDeLivraisonMC[]>
  {
    return this.http.get<BonDeLivraisonMC[]>(`${this.apiServeUrl}/admin/AllbonsdelivraisonsdeMC/${otId}`);
  }

  
    //récuperer le materiel livré dans BL de MC
    public getMaterielsBuBL(blId:number): Observable<Article[]>
    {
      return this.http.get<Article[]>(`${this.apiServeUrl}/admin/materielLivreeJoinMCbyBL/bl/${blId}`);
    }
    public getBLMCbyCode(code:String): Observable<BonDeLivraisonMC>
    {
      return this.http.get<BonDeLivraisonMC>(`${this.apiServeUrl}/admin/getBLbyCode/${code}`);
    }
  //ajouter BL
  
  public addblMC(blMC:BonDeLivraisonMC,idBC:number): Observable<BonDeLivraisonMC>
{
  return this.http.post<BonDeLivraisonMC>(`${this.apiServeUrl}/admin/addBonLivraisonMc/${idBC}`,blMC);
}

}
