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

  //récuperer l'article par code et metier
  public getArticlebyCodeandMetierId(codeArticle:string,metierId:number): Observable<Article>
  {
    return this.http.get<Article>(`${this.apiServeUrl}/admin/articlesbycode/${codeArticle}/metier/${metierId}`);
  }

  //récuperer l'article par code
  public getArticlebyCode(codeArticle:string): Observable<Article>
  {
    return this.http.get<Article>(`${this.apiServeUrl}/admin/articlesbycode/${codeArticle}`);
  }

   //récuperer l'article par code
   public getArticlebyMetierId(metierId:number): Observable<Article[]>
   {
     return this.http.get<Article[]>(`${this.apiServeUrl}/admin/metiers/${metierId}/articles`);
   }
  //ajouter un article
   public addArticle(metierId:number,typeId:number,article:Article): Observable<Article>
  {
    return this.http.post<Article>(`${this.apiServeUrl}/admin/metier/${metierId}/type/${typeId}/article`,article);
  }
}
