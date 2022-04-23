import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article } from '../model/Article';

@Injectable({
  providedIn: 'root'
})
export class ArticleRealiseeMCService {

  private apiServeUrl =environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

   //récuperer les articles realisees par ot
   public getArticlesRealiseesPresbyotId(otId:number): Observable<Article[]>
   {
     return this.http.get<Article[]>(`${this.apiServeUrl}/admin/articlesRealiseesJoinGlobalbyBC/prestation/ot/${otId}`);
   }

    //récuperer les articles realisees journalier par ot
    public getArticlesRealiseesPresJournalierbyotId(otId:number,dateA:Date): Observable<Article[]>
    {
      return this.http.get<Article[]>(`${this.apiServeUrl}/admin/articlesRealiseesJoinbydate/prestation/ot/${otId}/date/${dateA}`);
    }

    
    //récuperer les articles realisees journalier par ot
    public getArticlesRealiseesPresbyotIdparPeriode(otId:number,date1:Date,date2:Date): Observable<Article[]>
    {
      return this.http.get<Article[]>(`${this.apiServeUrl}/admin/articlesRealiseesJoinParPeriode/prestation/ot/${otId}/${date1}/${date2}`);
    }


     //récuperer les articles realisees par ot
   public getArticlesRealiseesMFbyotId(otId:number): Observable<Article[]>
   {
     return this.http.get<Article[]>(`${this.apiServeUrl}/admin/articlesRealiseesJoinGlobalbyBC/MF/ot/${otId}`);
   }

    //récuperer les articles realisees journalier par ot
    public getArticlesRealiseesMFJournalierbyotId(otId:number,dateA:Date): Observable<Article[]>
    {
      return this.http.get<Article[]>(`${this.apiServeUrl}/admin/articlesRealiseesJoinbydate/MF/ot/${otId}/date/${dateA}`);
    }

    
    //récuperer les articles realisees journalier par ot
    public getArticlesRealiseesMFbyotIdparPeriode(otId:number,date1:Date,date2:Date): Observable<Article[]>
    {
      return this.http.get<Article[]>(`${this.apiServeUrl}/admin/articlesRealiseesJoinParPeriode/MF/ot/${otId}/${date1}/${date2}`);
    }
}
