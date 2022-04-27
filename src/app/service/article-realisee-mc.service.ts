import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ArticleRealiseeMC } from '../model/ArticleRealiseeMC';

@Injectable({
  providedIn: 'root'
})
export class ArticleRealiseeMCService {
 
  private apiServeUrl =environment.apiBaseUrl;
  constructor(private http:HttpClient) { }

 //récuperer les articles Realisee dans un marchee cadre par l id de l'attachement 
 public getArticleRbyAttacId(attcID:number): Observable<ArticleRealiseeMC[]>
 {
   return this.http.get<ArticleRealiseeMC[]>(`${this.apiServeUrl}/admin/getARmcByAttachementId/${attcID}`);
 }
 
 public createAricleReaMC(attachementMCId:number,articleid:number,articlerealiseeMC:ArticleRealiseeMC): Observable<ArticleRealiseeMC>
 {
   return this.http.post<ArticleRealiseeMC>(`${this.apiServeUrl}/admin/attachementMC/${attachementMCId}/article/${articleid}/articlerealiseeMC`,articlerealiseeMC);
 }
}
