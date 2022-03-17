import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article } from '../model/Article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  
  private apiServeUrl =environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  //récuperer l'article par code
  public getArticlebyCodeandMetierId(codeArticle:string,metierId:number): Observable<Article>
  {
    return this.http.get<Article>(`${this.apiServeUrl}/admin/articlesbycode/${codeArticle}/metier/${metierId}`);
  }

   //récuperer l'article par code
   public getArticlebyMetierId(metierId:number): Observable<Article[]>
   {
     return this.http.get<Article[]>(`${this.apiServeUrl}/admin/metiers/${metierId}/articles`);
   }
}
