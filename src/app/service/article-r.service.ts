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
   public getArticlesRealiseesPresbybcId(bcId:number): Observable<Article[]>
   {
     return this.http.get<Article[]>(`${this.apiServeUrl}/admin/articlesRealiseesJoinGlobalbyBC/prestation/${bcId}`);
   }

    //récuperer les articles realisees journalier par bc
    public getArticlesRealiseesPresJournalierbybcId(bcId:number,dateA:Date): Observable<Article[]>
    {
      return this.http.get<Article[]>(`${this.apiServeUrl}/admin/articlesRealiseesJoinbydate/prestation/${bcId}/date/${dateA}`);
    }

    
    //récuperer les articles realisees journalier par bc
    public getArticlesRealiseesPresbybcIdparPeriode(bcId:number,date1:Date,date2:Date): Observable<Article[]>
    {
      return this.http.get<Article[]>(`${this.apiServeUrl}/admin/articlesRealiseesJoinParPeriode/prestation/${bcId}/${date1}/${date2}`);
    }


     //récuperer les articles realisees par bc
   public getArticlesRealiseesMFbybcId(bcId:number): Observable<Article[]>
   {
     return this.http.get<Article[]>(`${this.apiServeUrl}/admin/articlesRealiseesJoinGlobalbyBC/MF/${bcId}`);
   }

    //récuperer les articles realisees journalier par bc
    public getArticlesRealiseesMFJournalierbybcId(bcId:number,dateA:Date): Observable<Article[]>
    {
      return this.http.get<Article[]>(`${this.apiServeUrl}/admin/articlesRealiseesJoinbydate/MF/${bcId}/date/${dateA}`);
    }

    
    //récuperer les articles realisees journalier par bc
    public getArticlesRealiseesMFbybcIdparPeriode(bcId:number,date1:Date,date2:Date): Observable<Article[]>
    {
      return this.http.get<Article[]>(`${this.apiServeUrl}/admin/articlesRealiseesJoinParPeriode/MF/${bcId}/${date1}/${date2}`);
    }

}
