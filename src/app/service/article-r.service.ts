import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article } from '../model/Article';

@Injectable({
  providedIn: 'root'
})
export class ArticleRService {
  
  private apiServeUrl =environment.apiBaseUrl;

  constructor(private http: HttpClient) { }


   //récuperer les articles utilisees par bc
   public getArticlesUtiliseesbybcId(bcId:number): Observable<Article[]>
   {
     return this.http.get<Article[]>(`${this.apiServeUrl}/admin/articlesUtiliseesJoin/${bcId}`);
   }

   
   //récuperer les articles et leur types par metier
   public getArticlesJoinsbyMetierId(metierId:number): Observable<Article[]>
   {
     return this.http.get<Article[]>(`${this.apiServeUrl}/admin/articlesJoinsByMetier/${metierId}`);
   }
   
   //récuperer les articles realisees par bc
   public getArticlesRealiseesbybcId(bcId:number): Observable<Article[]>
   {
     return this.http.get<Article[]>(`${this.apiServeUrl}/admin/articlesRealiseesJoinGlobalbyBC/${bcId}`);
   }

    //récuperer les articles realisees journalier par bc
    public getArticlesRealiseesJournalierbybcId(bcId:number,dateA:Date): Observable<Article[]>
    {
      return this.http.get<Article[]>(`${this.apiServeUrl}/admin/articlesRealiseesJoinbydate/${bcId}/date/${dateA}`);
    }

    
    //récuperer les articles realisees journalier par bc
    public getArticlesRealiseesbybcIdparPeriode(bcId:number,date1:Date,date2:Date): Observable<Article[]>
    {
      return this.http.get<Article[]>(`${this.apiServeUrl}/admin/articlesRealiseesJoinParPeriode/${bcId}/${date1}/${date2}`);
    }

}
