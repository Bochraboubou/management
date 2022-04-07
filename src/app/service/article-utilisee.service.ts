import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ArticleUtilisee } from '../model/ArticleUtilisee';

@Injectable({
  providedIn: 'root'
})
export class ArticleUtiliseeService {
  private apiServeUrl =environment.apiBaseUrl;

  constructor(private http: HttpClient) { 
}
public addArticleUtilisee(bcId:number,articleId:number,articleUtilisee:ArticleUtilisee): Observable<ArticleUtilisee>
{
  return this.http.post<ArticleUtilisee>(`${this.apiServeUrl}/admin/bondescommande/${bcId}/article/${articleId}/articlesutilisee`,articleUtilisee);
}

 //récuperer les articleUtilisés par bonDeCommande
 public getArticlesUtiliseesbyBC(bcId:number): Observable<ArticleUtilisee[]>
 {
   return this.http.get<ArticleUtilisee[]>(`${this.apiServeUrl}/admin/bondecommande/${bcId}/articlesutilisees`);
 }

 //récuperer les articleUtilisés par article
 public getArticlesUtiliseesbyArticle(articleId:number): Observable<ArticleUtilisee[]>
 {
   return this.http.get<ArticleUtilisee[]>(`${this.apiServeUrl}/admin/article/${articleId}/articlesutilisees`);
 }
}
