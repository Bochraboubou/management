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


   //récuperer les articles realisees par bc
   public getArticlesRealiseesbybcId(bcId:number): Observable<Article[]>
   {
     return this.http.get<Article[]>(`${this.apiServeUrl}/admin/articlesRealisees/${bcId}`);
   }

   
   //récuperer les articles et leur types par metier
   public getArticlesJoinsbyMetierId(metierId:number): Observable<Article[]>
   {
     return this.http.get<Article[]>(`${this.apiServeUrl}/admin/articlesJoinsByMetier/${metierId}`);
   }
}
