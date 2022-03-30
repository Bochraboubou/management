import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ArticleUtilisee } from '../model/ArticleUtilisee';
import { BondeCommande } from '../model/BondeCommande';

@Injectable({
  providedIn: 'root'
})
export class BondeCommandeService {
  private apiServeUrl =environment.apiBaseUrl;

  constructor(private http: HttpClient) { }
  
  public addBondeCommande(marcheeId:number,entrepId:number,bc:BondeCommande): Observable<BondeCommande>
  {
    return this.http.post<BondeCommande>(`${this.apiServeUrl}/admin/marchees/${marcheeId}/bondescommandes/${entrepId}`,bc);
  }

  public getArticlesUtilisees(): Observable<ArticleUtilisee[]>
  {
    return this.http.get<ArticleUtilisee[]>(`${this.apiServeUrl}/admin/articlesutilisees`);
  }

   //récuperer la bc par code
   public getBCbyCode(code:string): Observable<BondeCommande>
   {
     return this.http.get<BondeCommande>(`${this.apiServeUrl}/admin/bcsbycode/${code}`);
   }

   
   //récuperer la bc par id
   public getBCbyId(id:number): Observable<BondeCommande>
   {
     return this.http.get<BondeCommande>(`${this.apiServeUrl}/admin/bcsbyid/${id}`);
   }


   //récuperer les bonsDeCommandes par MarcheeId
   public getBCsByMarchee(marcheeId:number): Observable<BondeCommande[]>
   {
     return this.http.get<BondeCommande[]>(`${this.apiServeUrl}/admin/marchee/${marcheeId}/bondescommandes`);
   }
}
