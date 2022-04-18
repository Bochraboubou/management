import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ArticleRealisee } from '../model/ArticleRealisee';

@Injectable({
  providedIn: 'root'
})
export class ArticleRealiseeService {

  private apiServeUrl =environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

//Ajouter un article realise
//nour
  public addArticleRealisee(attachementID:number,articleId:number,artr:ArticleRealisee): Observable<ArticleRealisee>
{
  return this.http.post<ArticleRealisee>(`${this.apiServeUrl}/admin/attachement/${attachementID}/article/${articleId}/articlerealisee`,artr);
}

// find liste of article realisee by attachement  id 
public findARbyAttId(attachementID:number): Observable<ArticleRealisee[]>
{
  return this.http.get<ArticleRealisee[]>(`${this.apiServeUrl}/admin/listeARByAttachId/${attachementID}`);
}
  
}
